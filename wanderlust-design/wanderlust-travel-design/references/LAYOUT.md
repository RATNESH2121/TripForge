# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 30, 32, 36, 40` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.site-nav__wrapper` | row | — | center | 16px | 5 |
| `div.site-nav__actions-container` | row | — | center | 16px | 3 |
| `div.site-nav-search__wrapper` | row | — | center | 12px | 3 |
| `div.shot-content-container` | column | — | center | — | 9 |
| `div#ssr-app.shot-page-container` | column | — | center | — | 2 |
| `div.shot-header__container` | column | — | — | — | 1 |
| `div.sticky-header__container` | row | space-between | center | 10px | 2 |
| `div.content-block-container.full-width` | row | — | — | — | 1 |
| `div.content-block-container.shot-only` | row | — | — | — | 1 |
| `div.user-avatar-container` | row | — | center | — | 3 |
| `div.display-flex.align-center` | row | — | center | 8px | 4 |
| `div.sticky-header__user-container` | row | — | center | 12px | 2 |
| `div.block-media-wrapper.content-block` | row | — | — | — | 1 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.site-footer-marquee__grid` | `204px 204px 204px 204px 204px 204px 204px 204px 20` | 32px | 16 |
| `div.shots-grid` | `333px 333px 333px 333px` | 36px | 1 |
| `div.more-by-thumbnails-container.lazyload` | `263px 263px 263px 263px` | 40px | 4 |
| `div.site-nav-sub__content-wrapper` | `146.078px 0px` | 8px | 1 |
| `div.site-nav-sub__content-wrapper` | `128.953px 0px` | 8px | 1 |
| `div.site-nav-sub__content-wrapper` | `20px 240.875px` | 8px | 2 |
| `div.site-nav-sub__content-wrapper` | `20px 207.391px` | 8px | 2 |
| `div.site-nav-sub__content-wrapper` | `20px 252.25px` | 8px | 2 |
| `div.site-nav-sub__content-wrapper` | `21px 189.797px` | 8px | 2 |
| `div.site-nav-sub__content-wrapper` | `20px 215.234px` | 8px | 2 |

## Structural Containers

### `<nav>` (`nav.site-nav-main`)

```
display:          block
children:         1
```

## Layout Rules

- **Container max-width:** `1200px` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

