# Product page and homepage revision

Review branch: `luxelette-product-focus`. Base: the current `luxelette` branch. Do not connect this review branch to the published theme. Connect it as a separate unpublished Shopify theme to test with real catalog data.

## Product page

The native default and campaign templates use the same compact purchase sequence:

1. Product name and Shopify-rendered price.
2. A short introduction: merchant-provided copy, or an escaped 28-word excerpt of the actual product description. No invented benefits are supplied.
3. Native color/size controls, with an optional expandable size-guide page. The size guide is hidden until a real page with content is selected. Kiwi can replace it later through the supported app integration.
4. Native add-to-cart button at full information-column width. The quantity selector is removed from these defaults to reduce vertical space; Shopify defaults to one unit and quantity remains editable in the cart. Merchants can add the native quantity block back in the editor.
5. Links to existing shipping/refund policies and icons for actually enabled payment types. No delivery date, free shipping, returns period or guarantee is invented.
6. Product description in an expandable native-style row, open initially. Additional native collapsible rows and app blocks remain available.

The mobile options link now observes the real buy button, so a long product description does not delay its appearance. It returns to the native option picker instead of maintaining a second cart form or a second variant state. Native form errors, unavailable variants, media changes and cart updates remain Dawn's responsibility.

These changes apply to the native default and campaign templates. GemPages layouts are preserved and can contain their own content and style overrides.

## Homepage

New order: smaller hero with one shopping CTA → actual product selection → category cards → short brand note → concise FAQ → newsletter. Extra introduction/guidance blocks and repeated sales text were removed.

Category cards use a selected collection's image automatically, allow an image override, and use the existing scoped search route until a collection is selected. If there is no image, the card is a compact text link; no blank product illustration is shown. The native product grid still stays hidden until the selected women's collection contains products.

## Reference patterns

- [Harper & Wells homepage](https://harperwells-boston.com/): products appear early, followed by reassurance and answers to shopping questions.
- [Harper & Wells product page](https://harperwells-boston.com/collections/women/products/camilla-loafers): price, color/size choices and CTA grouped together, with product details below.
- [Renley homepage](https://renleyco.com/): one promotional entry, bestsellers and short category routes.
- [Nordheim homepage](https://nordheim-mode.de/): early bestseller merchandising and category navigation.

The structural patterns were adapted to Luxelette. Brand assets, copy and reviews were not copied. Store volume does not establish that a particular layout caused higher conversion. No conversion uplift is claimed before measurement.

## Catalog dependency

The connected store was inspected read-only. It still has the legacy catalog and no populated women's collections. This revision does not create fictional women's products or reviews, import competitor stock, or republish legacy products as women's fashion. Real products, images, prices, size data, collection assignments and accurate policies are required for a complete commercial preview.

## Review checks

- Structural validation: section schemas, template ordering, block settings and presets.
- Shopify Theme Check: zero errors; imported app files retain their existing warnings.
- Component tests: visibility after the purchase button scrolls away, fallback when the button is absent, returning focus to native options and observer cleanup.
- In the unpublished Shopify preview, test mobile/desktop products with one variant, multiple variants, unavailable combinations, sold-out status, direct `?variant=` entry, add-to-cart success/errors and cart quantity updates. Confirm policy links, size-guide content and payment methods against real store settings.
- Review image crops, empty collections and keyboard operation. Measure mobile performance and conversion using actual catalog traffic before attributing a sales effect to this layout.
