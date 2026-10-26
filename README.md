# Luxelette

This is the **`luxelette` branch**: the ready-to-configure US women's-fashion version for **luxelette.com**. Connect this branch in Shopify. Start with the [Luxelette launch guide](docs/luxelette-launch.md), which distinguishes what is bundled from the remaining store settings.

Luxelette branding, homepage copy, editorial imagery, monogram, navigation and About/Contact/FAQ templates are included. Shopify products, pages, menus, domain, USD, policies and app configuration must be set in the store. The homepage does not feature the existing store's men's catalog.

The **`main` branch** remains the reusable Fashion Dawn base described below.

## Fashion Dawn base

A reusable English-language Shopify theme with reading and interaction defaults designed for a 45+ audience. Built on Shopify Dawn 16.0.0, source tree `05222537f672cc0e8ae8aa3ac07808b9cfc34742`. The base features below remain available as editor sections; the Luxelette homepage is configured for women only.

## What is included

- All native Dawn sections and core product, collection, search and cart behaviour.
- An editable fashion homepage: two editorial collection cards, category grid, women's edit, men's edit, image-and-text story and newsletter.
- Three colour presets: Everyday atelier, Classic navy and Modern minimal.
- Portrait product cards, second-image hover, native quick add, collection filtering, predictive search, cart drawer and recommendations.
- Larger reading defaults, 48px controls, visible keyboard focus and no reveal animations by default.
- Optional product information blocks for fit, materials, delivery or returns. Empty blocks remain hidden.
- An optional mobile bar linking back to the native product options after the product section has scrolled away. It does not create a second cart form.
- A `product.campaign` template for paid traffic, with an optional product story section.
- Native app-block and app-embed support for later Kiwi Size Chart, reviews and upsell integrations.
- Theme validation and an uploadable ZIP artifact through GitHub Actions.

## Use on a Shopify store

1. In **Online Store → Themes → Add theme → Connect from GitHub**, choose this repository and the `luxelette` branch. Alternatively upload `dist/luxelette.zip` built by the packaging script or downloaded from Actions.
2. Keep it as an unpublished theme while configuring and testing.
3. Open the theme editor. Add the store's logo and favicon, choose fonts and colours, and configure the homepage images and links. Resource selections are intentionally empty so one store's collection handles are not reused accidentally.
4. Create the women's collections and tags described in the Luxelette launch guide. The native featured collection stays hidden until a populated collection is selected.
5. Configure Shopify navigation menus: **luxelette-main-menu** for shop navigation and **luxelette-footer** for help links. Create the About, Contact and FAQ pages and assign their prepared templates.
6. Configure the **United States / USD** market and currency in Shopify. Prices use Shopify's market context. The theme does not activate markets, change the store currency, set tax rules, calculate shipping or create payment methods.
7. Add real policies in Shopify when ready. Set delivery and returns content in the product information blocks and/or add a Service information section. No shipping speed, free return or guarantee promises are prefilled.
8. Test an unpublished preview using real products, variants and images before publishing.

## Editing

Use native theme settings for typography, colours, buttons, cards, grids and spacing. **Theme settings → Fashion essentials** controls the fashion styling, minimum control height and product heading size.

Luxelette defaults to **Store branding → Typography style → Clean system sans**: readable system fonts, approximately 18px body text, clear medium-weight headings, larger prices and 52px minimum control height. This mode loads no additional font files. Choose Theme font to use the normal font pickers, or Editorial system serif to restore the earlier serif style. App-generated page content may have its own typography settings.

The **Fashion editorial** section supports two independently editable image cards, text, links, alignment, heading size, colour scheme and spacing. Its heading defaults to H2 when added; the supplied homepage uses H1. Keep one main H1 per page.

The **Service information** section supports up to four reorderable service blocks with icons, text and optional links. Add only promises that match that store's actual service.

On the product template, add, reorder or remove **Fashion information** blocks. Connect their text settings to product metafields if product-specific fit or material content is needed. No metafield definitions are required for the initial theme. Native collapsible rows, text, pop-ups, ratings and app blocks remain available.

Each JSON template can be edited in Shopify's theme editor. Sections and settings are stored per store; products, collections, menus, policies, apps, metafields, Markets and payments are Shopify store data and are not bundled into the theme.

## Kiwi Size Chart and future apps

Kiwi is not installed or activated by this repository. Follow Kiwi's current installation instructions for its app embed or supported app block, then place the size guide near the native variant picker. Existing Dawn product selectors and the native form are retained.

Future review and upsell apps can use native app blocks or app embeds. Real review content and configured apps are required; there are no invented ratings, customer counts, scarcity messages, preselected insurance or automatic discounts. Compatibility with a specific app version must be checked in the target store.

## Local development

Requires Python 3.12+, Node 22+ and Shopify CLI 4.8.3.

```sh
npm install --global @shopify/cli@4.8.3
python tools/validate_theme.py
node --test tests/*.test.cjs
shopify theme check --fail-level error
shopify theme dev --store your-store.myshopify.com
python tools/package_theme.py
```

The ZIP contains only Shopify theme directories, without documentation or development tools. CI validates and packages the theme but never publishes to a live store.

## Reusing for another brand

Use this repository as your source and connect it to a separate unpublished theme on each store. Configure branding, collections, images, navigation, product content and policies separately. For independently evolving brands, create a separate repository or branch per brand. Avoid editing one branch simultaneously from multiple stores, because Shopify's GitHub integration can write editor changes back to that branch.

## Validation and limits

See [validation.md](docs/validation.md) for recorded checks and the store acceptance checklist, and [research.md](docs/research.md) for the competitor observations used in the theme design.

Theme Check and structural validation do not replace storefront testing. No live store was supplied for this build, so payments, market configuration, performance scores, Kiwi integration and conversion improvements are not yet verified. Product photography, catalogue accuracy, fulfilment and customer service remain part of the store setup.

## Upstream and licence

Original Dawn code is copyright Shopify Inc. The original [LICENSE.md](LICENSE.md) is retained. Fashion Dawn is a custom derivative for Shopify stores, not an official Shopify product. The upstream import and fashion changes are separate local commits for review.
