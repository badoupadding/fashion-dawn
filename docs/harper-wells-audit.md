# Harper & Wells conversion review — 26 October 2026

Reference from the competitor sheet: https://harperwells-boston.com/. The similarly named harperandwells.com is a separate Trendtrack entry and was not used to establish scale.

Trendtrack estimates 1,695,334 monthly visits for harperwells-boston.com, 14.2% growth over 30 days, with 94.9% from the US. It returned no sales data. Traffic is an estimate and does not reveal conversion, profitability or prove which design elements work.

Inspected the homepage and the Emma product page: https://harperwells-boston.com/products/emma. Patterns observed: repeated collection offer; comparison prices and percentage badges; product rows early on the homepage; shipping and returns promises near the price; selectable size/color; stock reminder near add-to-cart; payment icons; product benefits and FAQs further down the page.

Implemented for Luxelette:

- Consistent collection sale messaging, ending when stock sells out as confirmed by the merchant. No fabricated date or countdown.
- Real percentage badges only for an exact selected variant or consistent product price pair. Different variant prices retain a generic Sale label.
- Variant-specific monetary savings, prominent green sale price and quieter crossed-out comparison price.
- Previously reviewed native purchase controls promoted into the live branch: unit price on add-to-cart, desktop/mobile sticky purchase controls, native variant availability and single native cart submission, visible native errors.
- Compact description excerpt, full description in an initially open expandable section, optional real size-guide page, and native FAQs close to product information.
- Existing confirmed stock reassurance, enabled payment methods, contact links, real collection links and equal-height product cards preserved.

Not adopted without store-specific evidence: their today-only deadline, 80% headline, customer reviews, fixed stock quantities, medical product claims, 24/7 support, carrier claims, guarantees or volume-discount tiers. Extra quantity discounts are not advertised unless implemented in checkout.

Merchant confirmation requested for free shipping and a 30-day return period. Pending confirmation these promises remain absent. Existing policies and account/domain branding still require the merchant's separate setup; legal copy was not rewritten.

Validation: native schema/template validator, Shopify Theme Check, and purchase-control component tests. A connected storefront browser inspection remains necessary for real product imagery, exact mobile spacing and checkout. Measure add-to-cart, checkout initiation and purchase conversion using real traffic before claiming uplift.
