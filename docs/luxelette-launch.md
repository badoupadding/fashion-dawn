# Luxelette — store setup

## Connect the right branch

In Shopify, choose **Online Store → Themes → Add theme → Connect from GitHub → badoupadding/fashion-dawn → luxelette**. The `main` branch remains the reusable women's/men's Fashion Dawn theme. The `luxelette` branch is the US women's-fashion version.

Use an unpublished theme until the store migration and preview checks below are complete. No theme was uploaded or published to the store by this build.

## Already in this branch

- Luxelette name in the header, footer, page titles, social metadata, password page and organization structured data.
- Warm ivory and burgundy palette with a clean system-sans typeface for body text and headings. The default body size is approximately 18px, supporting text is larger, and controls have a 52px minimum height.
- Bundled monogram favicon and an AI-generated lifestyle photograph optimized as a 209KB WebP. This is brand atmosphere, not a photograph of actual inventory. Replace it through the native hero image picker whenever desired; switch off the bundled image option to remove it.
- Women's-fashion homepage with native image banner, brand introduction, category links, a guarded native featured collection, shopping guidance, FAQ and newsletter.
- Starter navigation usable before store menus are created. Native menu `luxelette-main-menu` automatically replaces it when available.
- American English brand copy, native product/variant forms, cart drawer, search, filters and later app support.
- About, Contact and FAQ templates, without invented delivery promises, reviews, business addresses or support response times.

## Required store settings

These cannot be set by connecting a theme repository:

1. **Store identity:** set the Shopify store name to Luxelette and update the sender/contact email to a verified business address. The visible theme name override does not rename the admin, emails, checkout or account pages. The native contact form uses Shopify's configured recipient.
2. **Domain:** connect `luxelette.com`, finish Shopify's displayed DNS verification, wait for TLS and set it as the primary domain. The theme follows Shopify's canonical URL; it does not hard-code a domain or claim that domain verification is complete.
3. **Market and currency:** configure the US market and the intended USD store/presentment currency in Shopify. Review any currency-change restrictions before changing a store that has previous orders. The theme renders Shopify's actual prices and currencies and never relabels GBP prices as USD.
4. **Catalog:** import real women's products with accurate variants, images, fabric, fit, size measurements and prices. Review the old catalog's publication status so legacy products do not remain available through search, `/collections/all`, recommendations or direct URLs.
5. **Fulfilment and policies:** set shipping zones/rates, actual processing and delivery times, returns, taxes, business details and supported payments. Add actual policies in Shopify; confirm displayed promises match them.
6. **Apps:** install and configure Kiwi Size Chart using its current app-block/embed instructions. Upsells can be added later. Test the configured apps with the native product form.

## Collection and tag setup

The starter navigation uses Shopify product search scoped to `tag:luxelette`, so it does not send shoppers to the old untagged catalog. These links are valid search routes; until matching products are imported and tagged, they return no results.

| Use | Product tags | Planned collection handle |
| --- | --- | --- |
| All Luxelette products | `luxelette` | `luxelette` |
| Dresses | `luxelette`, `dresses` | `dresses` |
| Knitwear | `luxelette`, `knitwear` | `knitwear` |
| Tops and blouses | `luxelette`, `tops` | `tops` |
| Jackets and layers | `luxelette`, `outerwear` | `outerwear` |

Create an automated collection with handle `luxelette` matching product tag `luxelette`. The homepage featured section is preconfigured with that planned handle and stays hidden until it resolves to a populated collection. Alternatively choose a different real women's collection in the theme editor. The other handles are proposed setup values, not existing collections created by this build.

## Menus and pages

Create menu **luxelette-main-menu** with Shop all, Dresses, Knitwear, Tops & blouses, Jackets & layers. Link these to the actual collections after creation. The native header is preconfigured to use this menu, and the starter navigation hides when the menu exists.

Create these Shopify pages and select their templates:

| Page | Suggested handle | Theme template |
| --- | --- | --- |
| About Luxelette | `about` | `about` |
| Contact | `contact` | `contact` |
| Shopping guide | `faq` | `faq` |

The templates contain the editorial and form content. JSON templates do not create Shopify Page records. Create menu **luxelette-footer** linking to these pages and to the actual shipping/returns policies once ready. Native policy links in the footer read Shopify's configured policies.

## Before publishing

- Preview the homepage, real products, collections, contact form and empty search state on mobile and desktop.
- Verify image crop, headings, focus visibility, navigation and 200% zoom.
- Check that no legacy Men Haven branding, products, policies or support details remain in store-controlled surfaces.
- Place a test order in the US market: USD price, size/color, cart quantity, shipping, tax, payment and confirmation email.
- Verify Kiwi's size charts and any installed review/upsell app.
- Confirm all inventory images represent the products actually supplied. The generated hero is lifestyle imagery only.
- Check consent settings for marketing and analytics, and measure performance after the real catalog and apps are installed.

The code checks pass independently of store setup. Domain activation, currency migration, stock accuracy, contact delivery, checkout and live-store performance require testing in Shopify.
