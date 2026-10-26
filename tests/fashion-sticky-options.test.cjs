const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const vm = require('node:vm');

function setup(withPurchaseButton = false) {
  let Component;
  let observer;
  let focused = false;
  let scrolled = false;
  let removed = false;
  const events = {};
  const section = {};
  const purchaseButton = {};
  const input = { focus: () => { focused = true; } };
  const options = { scrollIntoView: () => { scrolled = true; }, querySelector: () => input };
  const info = { querySelector: () => options };
  const anchor = { addEventListener: (name, callback) => { events[name] = callback; }, removeEventListener: () => { removed = true; } };
  class Element {
    constructor() { this.dataset = { sectionId: 'test' }; this.hidden = true; }
    querySelector() { return anchor; }
  }
  class Observer {
    constructor(callback) { this.callback = callback; observer = this; }
    observe(element) { assert.equal(element, withPurchaseButton ? purchaseButton : section); }
    disconnect() { this.disconnected = true; }
  }
  const context = {
    HTMLElement: Element,
    IntersectionObserver: Observer,
    window: { IntersectionObserver: Observer },
    document: { getElementById: (id) => {
      if (id === 'MainProduct-test') return section;
      if (id === 'ProductSubmitButton-test') return withPurchaseButton ? purchaseButton : null;
      if (id === 'ProductInfo-test') return info;
      return null;
    } },
    customElements: { get: () => undefined, define: (name, component) => { Component = component; } },
  };
  const source = readFileSync(resolve(__dirname, '../snippets/fashion-sticky-options.liquid'), 'utf8');
  vm.runInNewContext(source.match(/{% javascript %}([\s\S]*?){% endjavascript %}/)[1], context);
  const element = new Component();
  element.connectedCallback();
  return { element, observer, events, results: () => ({ focused, scrolled, removed }) };
}

test('shows the link only after scrolling below the main product section', () => {
  const { element, observer } = setup();
  observer.callback([{ isIntersecting: false, boundingClientRect: { top: 400 } }]);
  assert.equal(element.hidden, true);
  observer.callback([{ isIntersecting: true, boundingClientRect: { top: -100 } }]);
  assert.equal(element.hidden, true);
  observer.callback([{ isIntersecting: false, boundingClientRect: { top: -1000 } }]);
  assert.equal(element.hidden, false);
});

test('returns focus to the native options and releases observers on removal', () => {
  const { element, observer, events, results } = setup();
  let prevented = false;
  events.click({ preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  assert.deepEqual(results(), { focused: true, scrolled: true, removed: false });
  element.disconnectedCallback();
  assert.equal(observer.disconnected, true);
  assert.equal(results().removed, true);
});

test('observes the buy button so long descriptions do not delay the mobile link', () => {
  const { element, observer } = setup(true);
  observer.callback([{ isIntersecting: false, boundingClientRect: { top: -80 } }]);
  assert.equal(element.hidden, false);
  observer.callback([{ isIntersecting: true, boundingClientRect: { top: 120 } }]);
  assert.equal(element.hidden, true);
});
