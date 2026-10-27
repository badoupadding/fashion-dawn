# Fashion competitor review and clean layout — 27 October 2026

Source scope: all 29 unique fashion domains in the supplied competitor sheet were rechecked with Trendtrack and homepage reads or search fallback. The repeated Kate and Wendy collection URL was deduplicated. Selected product-level references are linked below. This is a merchandising and theme review, not a checkout audit of every competitor.

Monthly visits below are Trendtrack estimates from the latest available snapshot, not measured conversion, verified sales, or a ranking of profitability. A similar name alone was never used to substitute domains. Competitor testimonials, product claims, shipping terms and stock counts are observations, not verified facts about Luxelette.

| Domain | Estimated monthly visits | Current observation |
| --- | ---: | --- |
| [mayfairandfinch.co.uk](https://mayfairandfinch.co.uk/) | 117,522 | Shipping and return reassurance before curated arrivals and seasonal products. |
| [belcien.com](https://belcien.com/) | 11,718 | Bestseller merchandising with shipping and return promises. |
| [claraandgrey.com](https://claraandgrey.com/) | 1,321 | Editorial introduction, early product rows and simple navigation. |
| [kateandwendy.com](https://kateandwendy.com/) | 98,447 | Collection-led homepage and seasonal promotion. |
| [redlich-becker.de](https://redlich-becker.de/) | 8,170 | Closure notice visible; weak current merchandising reference. |
| [oliverandblake.com](https://oliverandblake.com/) | 198,896 | Separate product routes, restrained product names and service information. |
| [kennedyalfred.com](https://kennedyalfred.com/) | 68,387 | Product-led category merchandising with sale pricing. |
| [theodoretownsend.com](https://theodoretownsend.com/) | 111,167 | Collection discovery followed by a service promise and social proof. |
| [brooklynridge.com](https://brooklynridge.com/) | 23,861 | Category/product-family routes and clear old/new prices. |
| [renleyco.com](https://renleyco.com/) | 17,814 | Early bestsellers and selectable color merchandising; very repetitive promotional strip is not adopted. |
| [ellamarbella.es](https://ellamarbella.es/) | 1,339 | Homepage returned 502. Older indexed collection pages only; not treated as a verified current layout. |
| [kaegreel.com](https://kaegreel.com/) | 59,726 | Specific footwear proposition and linked wear-test promise. |
| [parijanofficial.com](https://parijanofficial.com/) | 109,469 | Focused menswear positioning; lower relevance to current women’s assortment. |
| [karlson-berlin.com](https://karlson-berlin.com/) | 301,108 | Early bestsellers and new arrivals around a seasonal offer. |
| [lozendafashion.com](https://lozendafashion.com/) | 314,839 | Fashion catalogue/homepage inspected; German market context. |
| [kleefmode.com](https://kleefmode.com/) | 97,812 | New products and direct knitwear/shoe collection routes. |
| [jula-amsterdam.nl](https://jula-amsterdam.nl/) | 10,919 | Fashion storefront inspected; Dutch market context. |
| [wear-clo.com](https://wear-clo.com/) | 91,524 | Bare domain inaccessible; www storefront and indexed pages show early women/men product rows and service reassurance. |
| [byemiliarose.com](https://byemiliarose.com/) | 109,492 | Outerwear-led product rows; product pages expose size/fit, tabular measurements and compact detail sections. |
| [leonboutique.co](https://leonboutique.co/) | 343,478 | Women/men collection routes, bestseller rows and service section. |
| [harperwells-boston.com](https://harperwells-boston.com/) | 1,695,334 | Products early, benefits near purchase controls and frequently repeated service promise. |
| [drune.de](https://drune.de/) | 1,540,290 | Short category-first homepage followed by shipping, returns and support. |
| [montleigh.com](https://montleigh.com/) | 123,933 | Seasonal offer and categorized product-led merchandising. |
| [nordheim-mode.de](https://nordheim-mode.de/) | 896,259 | Bestsellers and service reassurance; conflicting guarantee periods visible, so no guarantee text copied. |
| [olviarose.com](https://olviarose.com/) | 31,815 | Redirected to maintenance/password page; not a current shopping-flow reference. |
| [maisonvillard.fr](https://maisonvillard.fr/) | 31,096 | Redirected to meliora-paris.com; broad category navigation. Original-domain traffic is not attributed to the destination. |
| [bristey.com](https://bristey.com/) | 392,588 | Currently a lighting/homewares store; excluded from fashion design decisions. |
| [theharringtonsisters.com](https://theharringtonsisters.com/) | 79,925 | Age-inclusive wardrobe positioning, early product rows and compact service information. |
| [olivamode.com](https://olivamode.com/) | 103,923 | Early outerwear bestsellers; product pages group price, options, fit and scarcity. |

## Product references and implications

- [Harper & Wells Emma](https://harperwells-boston.com/products/emma): price, options and purchase reassurance are grouped. Adopt the information hierarchy, not unverified guarantees, testimonials or exact stock figures.
- [Oliva puffer coat](https://olivamode.com/products/womens-long-hooded-puffer-coat-belted-winter-padded-jacket): compact options and collapsible details. Fit ratings and review counts require Luxelette evidence and were not copied.
- [Emilia Rose trench coat](https://byemiliarose.com/products/women-s-trench-coat-with-belt-and-textured-surface): actual tabular garment measurements close an important purchase question. No measurements were copied between products.
- [Nordheim Luna](https://nordheim-mode.de/products/luna-alltagsluxus1): product copy and size choices are prominent. Material, temperature and delivery claims require product-specific evidence and were not copied.

## Implemented changes

- Optional Clean conversion layout setting, enabled for Luxelette, with a configurable two-to-four-line card title area. Full product titles remain in the link’s accessible text and on product pages; catalogue/SEO titles are not rewritten.
- Compact hero and native section headings, shorter editorial copy, quieter service/contact text and smaller spacing. Both full native collection sliders and existing working collection/page links remain.
- Consistent card heights retained through the real product-component wrapper chain. Sale and regular-price products reserve matching price/button space. Old/new prices can sit together, with readable primary price and a smaller struck comparison price.
- Currency code suffix disabled for the current storefront using Dawn’s normal setting. Currency formatting still follows the active Shopify currency; price data is unchanged.
- Product page removes repeated promotional note and repeated sale/contact accordions. Automatic description excerpts are disabled in these templates to avoid repeating imported titles and generic marketing text. The editable summary block remains available.
- Native product details can now default to collapsed, configurable in the editor. Long supplier descriptions and size tables remain accessible, with bounded image/table widths. The price, size/color options, actual availability and primary action stay prominent.
- Mobile sticky purchase bar hides the repeated long title, retaining selected options, change-options link, current price in the button, native validation and single cart submission. Enabled payment icons are limited to six; no unsupported method is invented.
- No extra app or JavaScript library introduced. Free-shipping, return-period and delivery guarantees remain unset pending merchant confirmation.

## Remaining conversion dependencies

The 46 current collection products were read from Shopify: 26 outerwear and 20 footwear. None of their description HTML contains a size table. Some descriptions contain fit-related prose, but actual product-specific garment measurements and US shoe conversions need supplier data or the planned Kiwi setup. A fabricated size guide would add risk rather than confidence.

The read-only Shopify shop query still identifies https://menhaven.com as the primary domain. luxelette.com, account-domain branding and legacy legal-policy branding remain separate merchant setup dependencies. No policy promises, customer reviews, catalog prices, supplier stock or discounts were fabricated or changed by this pass.

## Verification and measurement

- Native theme structure, schema settings, block order and presets validated for both branches.
- Shopify Theme Check: zero errors, existing imported-app warnings remain.
- Existing purchase-control tests passed, covering native variant/price sync, availability, submission and errors.
- Chromium component fixture with active theme styles: sale and non-sale prices and quick-add controls align at 390, 768 and 1440 px; two-line title boxes remain equal height. Fixture uses the real product-component wrapper structure.
- Direct storefront HTTP/browser access was unavailable in this environment; Shopify theme-file readback verifies deployment but is not a visual inspection of the live storefront or checkout.
- After launch, measure product-view to add-to-cart, cart to checkout and purchase completion by device and traffic source. These layout choices are hypotheses; no uplift is claimed without comparable traffic data.
