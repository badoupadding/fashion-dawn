const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('node:vm');

function node(text = '') {
  const classes = new Set();
  const attrs = {};
  return {
    textContent: text, hidden: false, disabled: false,
    classList: { contains: value => classes.has(value), add: value => classes.add(value), remove: value => classes.delete(value) },
    setAttribute: (name, value) => { attrs[name] = value; },
    getAttribute: name => attrs[name] || null,
    addEventListener(name, callback) { this.listener = callback; },
    removeEventListener() { this.listener = null; },
  };
}

function setup(stickyEnabled = true) {
  let Component;
  let intersection;
  const observers = [];
  const label = node('Add to cart');
  const mainPrice = node();
  const button = node();
  let clicks = 0;
  button.querySelector = selector => selector === 'span' ? label : mainPrice;
  button.click = () => { clicks++; button.setAttribute('aria-disabled', 'true'); button.classList.add('loading'); };
  const current = node('$39.95');
  const compare = node('$79.95');
  const regular = node('$49.95');
  const root = node();
  root.classList.add('price--on-sale');
  root.querySelector = selector => selector === '.price-item--sale' ? current : selector === '.price__sale s' ? compare : regular;
  const price = node();
  price.querySelector = () => root;
  const message = node('This item is no longer available.');
  const error = node();
  error.hidden = true;
  error.querySelector = () => message;
  let options = ['Burgundy', 'M'];
  const section = { querySelector: () => error, querySelectorAll: () => options.map(value => ({ value })) };
  const action = node();
  const targets = {
    '[data-sticky-add]': action,
    '[data-sticky-price]': node(),
    '[data-sticky-compare]': node(),
    '[data-sticky-options]': node(),
    '[data-sticky-error]': node(),
  };
  class Element {
    constructor() { this.dataset = { sectionId: 'test', stickyEnabled: String(stickyEnabled), addingLabel: 'Adding...' }; this.hidden = true; }
    querySelector(selector) { return targets[selector] || null; }
  }
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(target) { this.target = target; }
    disconnect() { this.disconnected = true; }
  }
  class Intersection extends Observer {
    constructor(callback) { super(callback); intersection = this; }
  }
  vm.runInNewContext(readFileSync(resolve(__dirname, '../assets/fashion-purchase-controls.js'), 'utf8'), {
    HTMLElement: Element, MutationObserver: Observer, IntersectionObserver: Intersection,
    window: { IntersectionObserver: Intersection },
    document: { getElementById: id => ({ 'MainProduct-test': section, 'ProductSubmitButton-test': button, 'price-test': price }[id]) },
    customElements: { get: () => undefined, define: (name, component) => { Component = component; } },
  });
  const element = new Component();
  element.connectedCallback();
  return { element, intersection, observers, targets, action, label, button, mainPrice, price, root, current, compare, error, message, clicks: () => clicks, setOptions: value => { options = value; } };
}

test('uses the actual sale price and compare price, and follows native variant updates', () => {
  const s = setup();
  assert.equal(s.action.textContent, 'Add to cart — $39.95');
  assert.equal(s.mainPrice.textContent, ' — $39.95');
  assert.equal(s.targets['[data-sticky-compare]'].textContent, '$79.95');
  assert.equal(s.targets['[data-sticky-options]'].textContent, 'Burgundy / M');
  s.current.textContent = '$44.95';
  s.compare.textContent = '$84.95';
  s.setOptions(['Ivory', 'L']);
  s.observers[0].callback();
  assert.equal(s.action.textContent, 'Add to cart — $44.95');
  assert.equal(s.targets['[data-sticky-compare]'].textContent, '$84.95');
  assert.equal(s.targets['[data-sticky-options]'].textContent, 'Ivory / L');
  s.root.classList.remove('price--on-sale');
  s.element.sync();
  assert.equal(s.action.textContent, 'Add to cart — $49.95');
  assert.equal(s.targets['[data-sticky-compare]'].hidden, true);
});

test('submits through the original buy button once and blocks duplicate clicks while loading', () => {
  const s = setup();
  s.action.listener();
  assert.equal(s.clicks(), 1);
  assert.equal(s.action.disabled, true);
  assert.equal(s.action.getAttribute('aria-busy'), 'true');
  assert.equal(s.action.textContent, 'Adding...');
  s.action.listener();
  assert.equal(s.clicks(), 1);
  s.button.setAttribute('aria-disabled', 'false');
  s.button.classList.remove('loading');
  s.element.sync();
  assert.equal(s.action.disabled, false);
});

test('does not allow sold-out or unavailable variants and hides stale prices', () => {
  const s = setup();
  s.button.disabled = true;
  s.label.textContent = 'Sold out';
  s.element.sync();
  assert.equal(s.action.textContent, 'Sold out');
  assert.equal(s.mainPrice.hidden, true);
  assert.equal(s.targets['[data-sticky-price]'].textContent, '');
  s.action.listener();
  assert.equal(s.clicks(), 0);
  s.label.textContent = 'Unavailable';
  s.price.classList.add('hidden');
  s.element.sync();
  assert.equal(s.targets['[data-sticky-price]'].textContent, '');
  assert.equal(s.targets['[data-sticky-compare]'].hidden, true);
});

test('appears below the native buy button and surfaces the original form error', () => {
  const s = setup();
  assert.equal(s.intersection.target, s.button);
  s.intersection.callback([{ isIntersecting: false, boundingClientRect: { top: 400 } }]);
  assert.equal(s.element.hidden, true);
  s.intersection.callback([{ isIntersecting: false, boundingClientRect: { top: -80 } }]);
  assert.equal(s.element.hidden, false);
  s.error.hidden = false;
  s.element.sync();
  assert.equal(s.targets['[data-sticky-error]'].textContent, s.message.textContent);
  assert.equal(s.targets['[data-sticky-error]'].hidden, false);
  s.error.hidden = true;
  s.element.sync();
  assert.equal(s.targets['[data-sticky-error]'].hidden, true);
  s.element.disconnectedCallback();
  assert.equal(s.observers.every(observer => observer.disconnected), true);
  assert.equal(s.action.listener, null);
});

test('keeps the main button price synchronized when the sticky bar is disabled', () => {
  const s = setup(false);
  assert.equal(s.intersection, undefined);
  s.current.textContent = '$54.95';
  s.element.sync();
  assert.equal(s.mainPrice.textContent, ' — $54.95');
  assert.equal(s.element.hidden, true);
});
