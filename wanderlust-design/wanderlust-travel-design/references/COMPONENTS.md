# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Site Footer Marquee Item  Stack** | card | 16× | `.site-footer-marquee-item__stack` |
| **Site Footer Marquee Item  Media** | card | 16× | `.site-footer-marquee-item__media` |
| **Lazyload** | unknown | 16× | `.lazyload` |
| **Site Footer Marquee Item  Title** | card | 16× | `.site-footer-marquee-item__title` |
| **Site Nav Sub  Item** | card | 9× | `.site-nav-sub__item` |
| **Site Nav Sub  Link** | unknown | 9× | `.site-nav-sub__link`, `.site-nav-sub__link--bold` |
| **Site Nav Sub  Content Wrapper** | unknown | 9× | `.site-nav-sub__content-wrapper` |
| **Site Nav Sub  Text Content** | unknown | 9× | `.site-nav-sub__text-content` |
| **Site Nav Sub  Link** | unknown | 8× | `.site-nav-sub__link` |
| **Site Footer Marquee Item** | card | 8× | `.site-footer-marquee-item` |
| **Site Footer Marquee Item** | card | 8× | `.site-footer-marquee-item`, `.site-footer-marquee-item--duplicate` |
| **Site Nav Main  Item** | card | 4× | `.site-nav-main__item` |
| **Site Nav Main  Link** | unknown | 4× | `.site-nav-main__link` |
| **Shot Thumbnail** | list-item | 4× | `.shot-thumbnail` |
| **Hidden** | unknown | 4× | `.hidden`, `.media-placeholder`, `.shot-details-container` |
| **Animate Translate** | unknown | 4× | `.animate-translate`, `.loading-template`, `.shot` |
| **Site Nav Sub  Divider** | unknown | 3× | `.site-nav-sub__divider` |

## Cards

### Site Footer Marquee Item  Stack

**Instances found:** 16

**CSS classes:** `.site-footer-marquee-item__stack`

**HTML structure:**

```html
<div class="site-footer-marquee-item__stack"></div>
```

**Base styles (from design tokens):**

```css
.site-footer-marquee-item__stack {
  background: #060318;
  border: 1px solid #524b63;
  border-radius: 16px;
  padding: 8px;
}```

### Site Footer Marquee Item  Media

**Instances found:** 16

**CSS classes:** `.site-footer-marquee-item__media`

**HTML structure:**

```html
<div class="site-footer-marquee-item__media"> <img alt="Mobile" width="200" height="150" class="lazyload" data-sizes="auto" data-aspectratio="1.3333333333333333" data-src="https://cdn.dribbble.com/userupload/44652390/file/24bc626f335491d6dfc9dcded9f15781.jpg?format=webp&amp;resize={width}x{height}&amp;vertical=center"> </div>
```

**Base styles (from design tokens):**

```css
.site-footer-marquee-item__media {
  background: #060318;
  border: 1px solid #524b63;
  border-radius: 16px;
  padding: 8px;
}```

### Site Footer Marquee Item  Title

**Instances found:** 16

**CSS classes:** `.site-footer-marquee-item__title`

**HTML structure:**

```html
<div class="site-footer-marquee-item__title">Mobile</div>
```

**Base styles (from design tokens):**

```css
.site-footer-marquee-item__title {
  background: #060318;
  border: 1px solid #524b63;
  border-radius: 16px;
  padding: 8px;
}```

### Site Nav Sub  Item

**Instances found:** 9

**CSS classes:** `.site-nav-sub__item`

**HTML structure:**

```html
<li class="site-nav-sub__item" style="--site-nav-sub-item-order: -1"> <a href="/instantmatch" class="site-nav-sub__link site-nav-sub__link--bold" data-internal-track-cta="GetMatched"> <div class="site-nav-sub__content-wrapper"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" role="img" aria-hidden="true" class="icon "> <path d="M19.9818 11.1647V6.42118C19.9818 4.52359 19.9818 3.57479 19.5939 2.85001C19.2527 2.21247 18.7082 1.69414 18.0385 1.3693C17.2772 1 16.2805 1 14.2873 1H6.69454C4.70126 1 3.70463 1 2.9433 1.3693C2.27361 1.69414 1.72914 2.21247
```

**Base styles (from design tokens):**

```css
.site-nav-sub__item {
  background: #060318;
  border: 1px solid #524b63;
  border-radius: 16px;
  padding: 8px;
}```

### Site Footer Marquee Item

**Instances found:** 8

**CSS classes:** `.site-footer-marquee-item`

**HTML structure:**

```html
<a href="/shots/popular/mobile" class="site-footer-marquee-item " style="--stack-color-1: #E3EBFD; --stack-color-2: #EDF3D8;"> <div class="site-footer-marquee-item__stack"></div> <div class="site-footer-marquee-item__media"> <img alt="Mobile" width="200" height="150" class="lazyload" data-sizes="auto" data-aspectratio="1.3333333333333333" data-src="https://cdn.dribbble.com/userupload/44652390/file/24bc626f335491d6dfc9dcded9f15781.jpg?format=webp&amp;resize={width}x{height}&amp;vertical=center"> </div> <div class="site-footer-marquee-item__title">Mobile</div> </a>
```

**Base styles (from design tokens):**

```css
.site-footer-marquee-item {
  background: #060318;
  border: 1px solid #524b63;
  border-radius: 16px;
  padding: 8px;
}```

### Site Footer Marquee Item

**Instances found:** 8

**CSS classes:** `.site-footer-marquee-item` `.site-footer-marquee-item--duplicate`

**HTML structure:**

```html
<a href="/shots/popular/mobile" class="site-footer-marquee-item site-footer-marquee-item--duplicate" style="--stack-color-1: #E3EBFD; --stack-color-2: #EDF3D8;"> <div class="site-footer-marquee-item__stack"></div> <div class="site-footer-marquee-item__media"> <img alt="Mobile" width="200" height="150" class="lazyload" data-sizes="auto" data-aspectratio="1.3333333333333333" data-src="https://cdn.dribbble.com/userupload/44652390/file/24bc626f335491d6dfc9dcded9f15781.jpg?format=webp&amp;resize={width}x{height}&amp;vertical=center"> </div> <div class="site-footer-marquee-item__title">Mobile</div> 
```

**Base styles (from design tokens):**

```css
.site-footer-marquee-item {
  background: #060318;
  border: 1px solid #524b63;
  border-radius: 16px;
  padding: 8px;
}```

### Site Nav Main  Item

**Instances found:** 4

**CSS classes:** `.site-nav-main__item`

**HTML structure:**

```html
<li class="site-nav-main__item"> <a href="/shots/popular" class="site-nav-main__link" data-site-nav-sub-trigger="">Explore</a> <ul class="site-nav-sub"> <li> <a href="/shots/popular" class="site-nav-sub__link site-nav-sub__link--bold"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" role="img" aria-hidden="true" class="icon "> <path d="M22 7L14.1314 14.8686C13.7354 15.2646 13.5373 15.4627 13.309 15.5368C13.1082 15.6021 12.8918 15.6021 12.691 15.5368C12.4627 15.4627 12.2646 15.2646 11.8686 14.8686L9.13137 12.1314C8.73535 11.7354 8.53735 11.5373 8.3
```

**Base styles (from design tokens):**

```css
.site-nav-main__item {
  background: #060318;
  border: 1px solid #524b63;
  border-radius: 16px;
  padding: 8px;
}```

## List Items

### Shot Thumbnail

**Instances found:** 4

**CSS classes:** `.shot-thumbnail`

**HTML structure:**

```html
<li class="shot-thumbnail"> <div class="media-placeholder shot-details-container js-shot-details-container hidden"> <div class="loading-template shot animate-translate"></div> </div> </li>
```

**Base styles (from design tokens):**

```css
.shot-thumbnail {
  padding: 4px 0;
  border-bottom: 1px solid #524b63;
}```

## Other Components

### Lazyload

**Instances found:** 16

**CSS classes:** `.lazyload`

**HTML structure:**

```html
<img alt="Mobile" width="200" height="150" class="lazyload" data-sizes="auto" data-aspectratio="1.3333333333333333" data-src="https://cdn.dribbble.com/userupload/44652390/file/24bc626f335491d6dfc9dcded9f15781.jpg?format=webp&amp;resize={width}x{height}&amp;vertical=center">
```

**Base styles (from design tokens):**

```css
.lazyload {
  background: #060318;
  padding: 4px;
}```

### Site Nav Sub  Link

**Instances found:** 9

**CSS classes:** `.site-nav-sub__link` `.site-nav-sub__link--bold`

**HTML structure:**

```html
<a href="/instantmatch" class="site-nav-sub__link site-nav-sub__link--bold" data-internal-track-cta="GetMatched"> <div class="site-nav-sub__content-wrapper"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" role="img" aria-hidden="true" class="icon "> <path d="M19.9818 11.1647V6.42118C19.9818 4.52359 19.9818 3.57479 19.5939 2.85001C19.2527 2.21247 18.7082 1.69414 18.0385 1.3693C17.2772 1 16.2805 1 14.2873 1H6.69454C4.70126 1 3.70463 1 2.9433 1.3693C2.27361 1.69414 1.72914 2.21247 1.38792 2.85001C1 3.57479 1 4.52359 1 6.42118V18.1671C1 20.0646 1 21.
```

**Base styles (from design tokens):**

```css
.site-nav-sub__link {
  background: #060318;
  padding: 4px;
}```

### Site Nav Sub  Content Wrapper

**Instances found:** 9

**CSS classes:** `.site-nav-sub__content-wrapper`

**HTML structure:**

```html
<div class="site-nav-sub__content-wrapper"> <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none" role="img" aria-hidden="true" class="icon "> <path d="M19.9818 11.1647V6.42118C19.9818 4.52359 19.9818 3.57479 19.5939 2.85001C19.2527 2.21247 18.7082 1.69414 18.0385 1.3693C17.2772 1 16.2805 1 14.2873 1H6.69454C4.70126 1 3.70463 1 2.9433 1.3693C2.27361 1.69414 1.72914 2.21247 1.38792 2.85001C1 3.57479 1 4.52359 1 6.42118V18.1671C1 20.0646 1 21.0134 1.38792 21.7382C1.72914 22.3758 2.27361 22.8941 2.9433 23.2189C3.70463 23.5882 4.70126 23.5882 6.69454 23.588
```

**Base styles (from design tokens):**

```css
.site-nav-sub__content-wrapper {
  background: #060318;
  padding: 4px;
}```

### Site Nav Sub  Text Content

**Instances found:** 9

**CSS classes:** `.site-nav-sub__text-content`

**HTML structure:**

```html
<div class="site-nav-sub__text-content"> <span class="site-nav-sub__title">Start Project Brief</span> <span class="site-nav-sub__description">Get recommendations and proposals</span> </div>
```

**Base styles (from design tokens):**

```css
.site-nav-sub__text-content {
  background: #060318;
  padding: 4px;
}```

### Site Nav Sub  Link

**Instances found:** 8

**CSS classes:** `.site-nav-sub__link`

**HTML structure:**

```html
<a href="/shots/popular/product-design" class="site-nav-sub__link">Product Design</a>
```

**Base styles (from design tokens):**

```css
.site-nav-sub__link {
  background: #060318;
  padding: 4px;
}```

### Site Nav Main  Link

**Instances found:** 4

**CSS classes:** `.site-nav-main__link`

**HTML structure:**

```html
<a href="/shots/popular" class="site-nav-main__link" data-site-nav-sub-trigger="">Explore</a>
```

**Base styles (from design tokens):**

```css
.site-nav-main__link {
  background: #060318;
  padding: 4px;
}```

### Hidden

**Instances found:** 4

**CSS classes:** `.hidden` `.media-placeholder` `.shot-details-container`

**HTML structure:**

```html
<div class="media-placeholder shot-details-container js-shot-details-container hidden"> <div class="loading-template shot animate-translate"></div> </div>
```

**Base styles (from design tokens):**

```css
.hidden {
  background: #060318;
  padding: 4px;
}```

### Animate Translate

**Instances found:** 4

**CSS classes:** `.animate-translate` `.loading-template` `.shot`

**HTML structure:**

```html
<div class="loading-template shot animate-translate"></div>
```

**Base styles (from design tokens):**

```css
.animate-translate {
  background: #060318;
  padding: 4px;
}```

### Site Nav Sub  Divider

**Instances found:** 3

**CSS classes:** `.site-nav-sub__divider`

**HTML structure:**

```html
<span class="site-nav-sub__divider"></span>
```

**Base styles (from design tokens):**

```css
.site-nav-sub__divider {
  background: #060318;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#524b63` for all dividers within components

