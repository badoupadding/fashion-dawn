if (!customElements.get('fashion-sticky-options')) {
  customElements.define('fashion-sticky-options', class extends HTMLElement {
    connectedCallback() {
      this.section = document.getElementById(`MainProduct-${this.dataset.sectionId}`);
      this.sourceButton = document.getElementById(`ProductSubmitButton-${this.dataset.sectionId}`);
      this.sourcePrice = document.getElementById(`price-${this.dataset.sectionId}`);
      this.action = this.querySelector('[data-sticky-add]');
      if (!this.section || !this.sourceButton || !this.sourcePrice || !this.action) return;
      this.errorSource = this.section.querySelector('.product-form__error-message-wrapper');
      this.onClick = () => {
        this.sync();
        if (this.action.disabled) return;
        this.sourceButton.click();
        this.sync();
      };
      this.action.addEventListener('click', this.onClick);
      this.priceObserver = new MutationObserver(() => this.sync());
      this.priceObserver.observe(this.sourcePrice, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
      this.buttonObserver = new MutationObserver(() => this.sync());
      this.buttonObserver.observe(this.sourceButton, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['disabled', 'aria-disabled', 'class'] });
      if (this.errorSource) {
        this.errorObserver = new MutationObserver(() => this.sync());
        this.errorObserver.observe(this.errorSource, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden'] });
      }
      if ('IntersectionObserver' in window && this.dataset.stickyEnabled === 'true') {
        this.visibilityObserver = new IntersectionObserver(([entry]) => {
          this.hidden = entry.isIntersecting || entry.boundingClientRect.top >= 0;
          this.sync();
        });
        this.visibilityObserver.observe(this.sourceButton);
      }
      this.sync();
    }

    setText(node, value) {
      if (node && node.textContent !== value) node.textContent = value;
    }

    sync() {
      if (!this.sourceButton || !this.action) return;
      const blocked = this.sourceButton.disabled || this.sourceButton.getAttribute('aria-disabled') === 'true';
      const priceRoot = this.sourcePrice.querySelector('.price');
      const onSale = Boolean(priceRoot?.classList.contains('price--on-sale'));
      const priceHidden = this.sourcePrice.classList.contains('hidden');
      const currentPrice = priceHidden || this.sourceButton.disabled ? '' : (priceRoot?.querySelector(onSale ? '.price-item--sale' : '.price__regular .price-item--regular')?.textContent.trim() || '');
      const comparePrice = onSale && currentPrice ? (priceRoot?.querySelector('.price__sale s')?.textContent.trim() || '') : '';
      const nativeLabel = this.sourceButton.querySelector('span')?.textContent.trim() || '';
      const buttonPrice = this.sourceButton.querySelector('[data-fashion-button-price]');
      this.setText(buttonPrice, currentPrice && !blocked ? ` — ${currentPrice}` : '');
      if (buttonPrice) buttonPrice.hidden = blocked || !currentPrice;
      this.action.disabled = blocked;
      const loading = this.sourceButton.classList.contains('loading');
      this.action.setAttribute('aria-busy', loading ? 'true' : 'false');
      this.setText(this.action, loading ? (this.dataset.addingLabel || nativeLabel) : currentPrice && !blocked ? `${nativeLabel} — ${currentPrice}` : nativeLabel);
      this.setText(this.querySelector('[data-sticky-price]'), currentPrice);
      const compare = this.querySelector('[data-sticky-compare]');
      this.setText(compare, comparePrice);
      if (compare) compare.hidden = !comparePrice;
      this.dataset.onSale = onSale ? 'true' : 'false';
      const selected = [...this.section.querySelectorAll('variant-selects input:checked, variant-selects select')].map(input => input.value).filter(Boolean).join(' / ');
      this.setText(this.querySelector('[data-sticky-options]'), selected);
      const error = this.errorSource && !this.errorSource.hidden ? (this.errorSource.querySelector('.product-form__error-message')?.textContent.trim() || '') : '';
      const errorTarget = this.querySelector('[data-sticky-error]');
      this.setText(errorTarget, error);
      if (errorTarget) errorTarget.hidden = !error || this.hidden;
    }

    disconnectedCallback() {
      this.priceObserver?.disconnect();
      this.buttonObserver?.disconnect();
      this.errorObserver?.disconnect();
      this.visibilityObserver?.disconnect();
      this.action?.removeEventListener('click', this.onClick);
    }
  });
}
