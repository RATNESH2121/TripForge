# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 3 | default, hover, focus |
| Link | 3 | default, hover, focus |
| Input | 1 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), background-color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border-radius 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), padding 0.05s cubic-bezier(0.32, 0, 0.59, 0.03);
transition: color 0.1s;
transition: background-color 0.2s, outline 0.2s, color 0.2s, box-shadow 0.2s, -webkit-box-shadow 0.2s;
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `close`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* background-color: rgb(61, 61, 78) → */ background-color: rgb(86, 85, 100);
```

**On focus:**

```css
/* background-color: rgb(61, 61, 78) → */ background-color: rgb(255, 255, 255);
/* border-color: rgba(0, 0, 0, 0) → */ border-color: rgb(219, 219, 222);
/* outline: rgb(158, 158, 167) none 3px → */ outline: rgb(243, 175, 228) solid 2px;
/* outline-color: rgb(158, 158, 167) → */ outline-color: rgb(243, 175, 228);
```

**Transition:** `color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), background-color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border-radius 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), padding 0.05s cubic-bezier(0.32, 0, 0.59, 0.03)`

### Button 2 — `Shots`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On hover:**

```css
/* color: rgb(58, 53, 70) → */ color: rgb(123, 113, 148);
/* border-color: rgb(58, 53, 70) → */ border-color: rgb(123, 113, 148);
/* outline: rgb(58, 53, 70) none 3px → */ outline: rgb(123, 113, 148) none 3px;
/* outline-color: rgb(58, 53, 70) → */ outline-color: rgb(123, 113, 148);
```

### Button 3 — `Search`

**States:**

- Default: `../screens/states/button-3-default.png`
- Hover: `../screens/states/button-3-hover.png`
- Focus: `../screens/states/button-3-focus.png`

**On hover:**

```css
/* background-color: rgb(234, 76, 137) → */ background-color: rgb(236, 94, 149);
/* border-color: rgb(234, 76, 137) → */ border-color: rgb(236, 94, 149);
```

**On focus:**

```css
/* background-color: rgb(234, 76, 137) → */ background-color: rgb(236, 94, 149);
/* border-color: rgb(234, 76, 137) → */ border-color: rgb(236, 94, 149);
/* outline: rgb(255, 255, 255) none 3px → */ outline: rgb(243, 175, 228) solid 2px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgb(243, 175, 228);
```

**Transition:** `color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), background-color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border-radius 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), padding 0.05s cubic-bezier(0.32, 0, 0.59, 0.03)`

## Link Interactions

### Link 1 — `Explore Top Agency Shots`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On hover:**

```css
/* color: rgb(13, 12, 34) → */ color: rgb(110, 109, 122);
/* outline: rgb(13, 12, 34) none 3px → */ outline: rgb(110, 109, 122) none 3px;
/* outline-color: rgb(13, 12, 34) → */ outline-color: rgb(110, 109, 122);
```

**On focus:**

```css
/* color: rgb(13, 12, 34) → */ color: rgb(110, 109, 122);
/* border-color: rgba(0, 0, 0, 0) → */ border-color: rgb(110, 109, 122);
/* outline: rgb(13, 12, 34) none 3px → */ outline: rgb(243, 175, 228) solid 2px;
/* outline-color: rgb(13, 12, 34) → */ outline-color: rgb(243, 175, 228);
```

**Transition:** `color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), background-color 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), border-radius 0.05s cubic-bezier(0.32, 0, 0.59, 0.03), padding 0.05s cubic-bezier(0.32, 0, 0.59, 0.03)`

### Link 2 — `Back to home page`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On hover:**

```css
/* color: rgb(6, 3, 24) → */ color: rgb(61, 61, 78);
/* border-color: rgb(6, 3, 24) → */ border-color: rgb(61, 61, 78);
/* outline: rgb(6, 3, 24) none 3px → */ outline: rgb(61, 61, 78) none 3px;
/* outline-color: rgb(6, 3, 24) → */ outline-color: rgb(61, 61, 78);
```

**On focus:**

```css
/* outline: rgb(6, 3, 24) none 3px → */ outline: rgb(243, 175, 228) solid 2px;
/* outline-color: rgb(6, 3, 24) → */ outline-color: rgb(243, 175, 228);
```

**Transition:** `color 0.1s`

### Link 3 — `Explore`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**On hover:**

```css
/* color: rgb(6, 3, 24) → */ color: rgb(123, 113, 148);
/* border-color: rgb(6, 3, 24) → */ border-color: rgb(123, 113, 148);
/* outline: rgb(6, 3, 24) none 3px → */ outline: rgb(123, 113, 148) none 3px;
/* outline-color: rgb(6, 3, 24) → */ outline-color: rgb(123, 113, 148);
```

**On focus:**

```css
/* outline: rgb(6, 3, 24) none 3px → */ outline: rgb(243, 175, 228) solid 2px;
/* outline-color: rgb(6, 3, 24) → */ outline-color: rgb(243, 175, 228);
```

## Input Interactions

### Input 1 — `What are you looking for?`

**States:**

- Default: `../screens/states/input-1-default.png`
- Hover: `../screens/states/input-1-hover.png`
- Focus: `../screens/states/input-1-focus.png`

**Transition:** `background-color 0.2s, outline 0.2s, color 0.2s, box-shadow 0.2s, -webkit-box-shadow 0.2s`

_No visible style changes detected for this element._

## Interaction Rules

- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.05s`, `0.1s`, `0.2s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

