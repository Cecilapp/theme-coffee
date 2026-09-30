# Coffee theme

_Coffee_ is a corporate theme for [Cecil](https://cecil.app), powered by [Tailwind CSS](https://tailwindcss.com).

Pages are composed of **blocks** declared in front matter: hero slider, cards grid, logos, split, news, call to action, key figures, features and free text. Big uppercase headings, stacked rounded sections and a warm coffee palette.

Features:

- Blocks-based pages (homepage and any page)
- Main menu with dropdowns, mobile menu
- Multilingual (English and French translations included)
- Self-hosted font ([Outfit](https://github.com/Outfitio/Outfit-Fonts), OFL)
- Lightweight vanilla JS (slider, menus, scroll reveal), respects `prefers-reduced-motion`

## Installation

```bash
composer require cecil/theme-coffee
```

> Or [download the latest archive](https://github.com/Cecilapp/theme-coffee/releases/latest/) and uncompress its content in `themes/coffee`.

## Usage

Add `coffee` in the `theme` section of your `config.yml`:

```yaml
theme:
  - coffee
```

### Configuration

```yaml
coffee:
  logo: images/logo.svg      # in `assets/`; the site title is displayed if empty
  header:
    sticky: true             # header stays on top and becomes opaque on scroll
    button:                  # optional call to action in the header
      label: Contact
      url: /contact/
  dated_sections: [news, blog] # sections whose pages display their date
  socials:                   # icons: x, bluesky, facebook, instagram, linkedin, youtube, github, mastodon, discord, twitch, tiktok
    - {name: x, url: 'https://x.com/acme'}
    - {name: youtube, url: 'https://www.youtube.com/@acme'}
  company: |                 # Markdown, displayed in the footer
    **Acme Group Inc.**
    42 Roast Street, Stockholm, Sweden
  copyright: Acme Group      # defaults to the site title
```

> [!NOTE]
> A language `config` block replaces the whole `coffee` key: repeat the values you want to keep (YAML anchors help, see [`demo/config.yml`](demo/config.yml)).

### Menus

| Menu     | Usage                                                                  |
|----------|------------------------------------------------------------------------|
| `main`   | Header navigation                                                      |
| `footer` | Footer columns (falls back to `main`)                                  |
| `legal`  | Footer bottom links (privacy notice, cookies, etc.)                    |

**Dropdowns and footer columns**: a menu named after an entry's `id` holds its children.

```yaml
menus:
  main:
    - {id: about, name: About, url: /about/, weight: 10}
    - {id: company, name: Company, url: /company/, weight: 20}
  company: # children of the "company" entry
    - {id: teams, name: Our teams, url: /company/teams/, weight: 10}
    - {id: investors, name: Investors, url: /company/investors/, weight: 20}
```

### Pages

Common front matter variables:

```yaml
title: About us
kicker: The family          # small label above the title
description: A short intro. # displayed under the title
image: images/team.jpg      # header background (and cards thumbnail)
blocks: []                  # see below
```

A page starting with a `hero` block has no page header. For a blocks-based homepage, disable its pagination with `pagination: false`.

### Blocks

Every block accepts:

- `type` (required): `hero`, `cards`, `logos`, `split`, `news`, `cta`, `stats`, `features` or `text`
- `id`: HTML anchor (e.g. `/about/#figures`)
- `theme`: `dark`, `night`, `cream`, `sand` or `coffee`
- `kicker`, `title`, `text` (Markdown)
- `buttons`: one `{label, url, style}` or a list of them; `style`: `primary`, `light`, `dark` or `outline`
- `enabled: false` to hide the block

| Type       | Specific options                                                                                        |
|------------|---------------------------------------------------------------------------------------------------------|
| `hero`     | `slides: [{kicker, title, text, image, logo, buttons}]`, `height: full\|large`, `autoplay` (ms, `0` to disable) |
| `cards`    | `section` (section id, lists its pages), `items: [{title, text, image, url, label}]`, `limit`, `columns: 2\|3\|4`, `ratio: portrait\|landscape\|square` |
| `logos`    | `items: [{name, image, url, text}]`                                                                     |
| `split`    | `image`, `alt`, `reverse`                                                                               |
| `news`     | `section` (default `news`), `limit` (default `3`)                                                       |
| `cta`      | `image` (background)                                                                                    |
| `stats`    | `items: [{value, label}]`                                                                               |
| `features` | `items: [{title, text, url}]`, `columns: 2\|3\|4`                                                       |
| `text`     | `content` (Markdown), `align: left\|center`                                                             |

Example:

```yaml
---
title: Home
pagination: false
blocks:
  - type: hero
    slides:
      - kicker: Out now
        title: Northwind 2.0 has landed
        image: images/hero.jpg
        buttons: {label: Discover, url: /products/northwind/}
  - type: cards
    title: Our products
    section: products
  - type: news
    title: Latest news
  - type: cta
    theme: coffee
    title: Join the crew
    buttons: {label: See open positions, url: /careers/, style: light}
---
```

Add your own block by creating `layouts/partials/blocks/<type>.html.twig` in your site: it receives `block`, `theme` (`{classes, dark}`) and `anchor`.

### Internationalization

UI strings are translatable; English and French translations are included in [`translations/`](translations/).

To add a language, create `translations/messages.<locale>.yaml` in your site, or extract the strings with:

```bash
cecil util:translations:extract --locale=<locale> --save --theme=coffee
```

## Development

### Build the CSS

The compiled CSS (`assets/styles.css`) is committed. After changing templates or `assets/tailwind.css`, rebuild it with [tailwind-builder](https://github.com/ArnaudLigny/tailwind-builder):

```bash
composer install
composer css:build   # or `composer css:watch`
```

### Demo site

```bash
composer demo:link   # links the theme as `demo/themes/coffee`
cecil serve demo
```

## Credits

- Structure inspired by [coffeestain.com](https://coffeestain.com)
- [Outfit](https://github.com/Outfitio/Outfit-Fonts) font (SIL Open Font License)
- Social icons from [Simple Icons](https://simpleicons.org) (CC0)

## License

_Coffee_ is a free software distributed under the terms of the MIT license.

© [Arnaud Ligny](https://arnaudligny.fr)
