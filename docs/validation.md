# Validation

## Luxelette branch

The Luxelette branding and US women's-fashion configuration also pass Shopify Theme Check with zero errors and the same nine inherited Dawn warnings. Structural validation checks 49 native/custom section schemas, template settings and presets. A WebP lifestyle asset and SVG monogram are bundled; the hero image picker overrides the asset. No live-store settings were changed. The legacy catalog was inspected read-only to avoid featuring unrelated products. Store setup and acceptance are listed in [luxelette-launch.md](luxelette-launch.md).

## Build checks

- Shopify CLI 4.8.3 Theme Check: zero errors. Nine warnings remain in inherited Dawn code (variable naming, unused assignments, undefined-object analysis, one orphaned snippet and facets complexity). No warnings were reported in the new fashion snippets or sections.
- `python tools/validate_theme.py`: passes. Checks JSON parsing, section references, section/block order, block types, setting IDs, range bounds, selected values and all three presets.
- Mobile options component tests pass for visibility after scrolling, focus returning to the native options, and observer cleanup. These are component tests with a minimal DOM harness, not browser acceptance tests.
- Theme packaging: includes theme directories at the ZIP root and excludes repository tooling and documentation.

The Shopify AI Toolkit validation wrapper was attempted, but its separate `@shopify/theme-check-common` dependency was unavailable in this environment. Shopify CLI Theme Check was run directly instead. The toolkit's documentation search was also unavailable over the local network; official Shopify documentation was read through the web connector.

## Before publishing on each store

- Add licensed brand and product photography, collection assignments, menus and accurate product content.
- Verify UK prices are in GBP and US prices in USD after changing country. Check product availability, taxes and shipping settings for both markets in Shopify.
- Test mobile and desktop navigation, search suggestions, filters, sorting and pagination.
- Test single-variant, multi-variant, unavailable-combination and sold-out products. Confirm image, price, selected variant and cart line match, including when entering from an ad URL containing a variant.
- Test quick add and the cart drawer: quantities, removal, errors, discount display and checkout handoff.
- Test the mobile options link after scrolling below the product section, keyboard navigation, visible focus, 200% zoom and reduced-motion preference.
- Install Kiwi, configure actual size charts and test their placement and operation with variant selection. Test review and upsell apps when chosen.
- Add accurate shipping, returns and contact details; confirm all displayed service promises agree with policies.
- Test the newsletter form and Shopify consent configuration.
- Measure mobile LCP, CLS and INP with real content and apps. No Lighthouse score or conversion uplift is claimed for this unconnected build.

No store authentication, live preview or real checkout was available during this build. The checklist above remains store acceptance work.
