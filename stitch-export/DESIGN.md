---
name: Artisanal Warmth
colors:
  surface: '#fff8f1'
  surface-dim: '#e0d9cf'
  surface-bright: '#fff8f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2e9'
  surface-container: '#f5ede3'
  surface-container-high: '#efe7dd'
  surface-container-highest: '#e9e1d8'
  on-surface: '#1e1b15'
  on-surface-variant: '#54433c'
  inverse-surface: '#33302a'
  inverse-on-surface: '#f7f0e6'
  outline: '#87736a'
  outline-variant: '#dac1b7'
  surface-tint: '#944a23'
  primary: '#592100'
  on-primary: '#ffffff'
  primary-container: '#78350f'
  on-primary-container: '#ffa072'
  inverse-primary: '#ffb693'
  secondary: '#815436'
  on-secondary: '#ffffff'
  secondary-container: '#fec29c'
  on-secondary-container: '#794e30'
  tertiary: '#003650'
  on-tertiary: '#ffffff'
  tertiary-container: '#004e71'
  on-tertiary-container: '#87bee7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcc'
  primary-fixed-dim: '#ffb693'
  on-primary-fixed: '#351000'
  on-primary-fixed-variant: '#76330d'
  secondary-fixed: '#ffdcc7'
  secondary-fixed-dim: '#f5ba95'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#663d21'
  tertiary-fixed: '#c8e6ff'
  tertiary-fixed-dim: '#95cdf6'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#004c6e'
  background: '#fff8f1'
  on-background: '#1e1b15'
  surface-variant: '#e9e1d8'
  ube-purple: '#8C6BB1'
  matcha-green: '#A3B18A'
  cream-bg: '#FFF7ED'
  off-white: '#F5F5F5'
typography:
  headline-xl:
    fontFamily: Libre Caslon Text
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-xl-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style
The brand personality of the design system is warm, artisanal, and deeply inviting, capturing the tactile joy of freshly baked goods. It targets a discerning audience that values craft, quality ingredients, and a "home-baked" feel with a professional finish.

The design style is a blend of **Minimalism** and **Tactile** design. It utilizes heavy whitespace to allow high-quality food photography to breathe, while employing soft, organic textures and a warm color palette to ensure the interface never feels cold or clinical. The emotional response is one of comfort, nostalgia, and premium quality.

## Colors
The palette is rooted in the natural tones of the bakehouse. The primary color is a rich, warm brown that mirrors toasted crusts, while the secondary color provides deep contrast for readability and high-impact accents. The neutral base is a warm cream rather than pure white, evoking the color of flour and parchment.

Soft accent colors - Ube Purple and Matcha Green - are used sparingly to highlight specific product categories or flavors, adding a modern, artisanal flair without overwhelming the earthy foundation.

## Typography
The typography system uses a sophisticated serif-and-sans pairing. Headlines utilize **Libre Caslon Text**, an elegant serif that mirrors the classic, authoritative yet refined nature of the logo's script elements.

For body copy and functional UI elements, **Be Vietnam Pro** provides a contemporary, friendly, and highly legible experience. Its soft terminals and open apertures maintain the approachable brand voice even in dense information like ingredient lists or shipping details. All labels utilize a slight letter-spacing increase to ensure clarity against the warm background tones.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to maintain a boutique, editorial feel, while transitioning to a fluid model on mobile. Spacing is intentionally generous - the "airy" quality is achieved through large margins and substantial vertical padding between sections (often 80px or 120px on desktop).

Content should be centered in the viewport with significant lateral "safe zones" to emphasize the curated nature of the product catalog. Grid gutters are wide (24px+) to prevent the interface from feeling crowded or "discount."

## Elevation & Depth
This design system avoids heavy drop shadows in favor of **Tonal Layers** and subtle **Ambient Shadows**. Depth is primarily conveyed through color shifts (e.g., a card placed on a `#FFF7ED` background might be `#FFFFFF`).

When elevation is required for interactivity (like a hovering product card), use an extremely soft, diffused shadow with a hint of the primary brown tint (`rgba(120, 53, 15, 0.08)`) rather than pure black. This keeps the interface feeling "soft" and organic. Low-contrast outlines in `#78350F` at 10% opacity are preferred for defining boundaries without adding visual weight.

## Shapes
The shape language is consistently **Rounded**. Sharp corners are avoided to maintain the friendly, artisanal aesthetic. Elements like buttons and input fields use a medium radius (0.5rem) to feel "baked" and soft. Product images should utilize the same roundedness to harmonize with the UI, creating a cohesive, organic visual flow.

## Components
- **Buttons:** Primary buttons use the secondary color (`#422006`) with white text. Secondary buttons use an outline style with the primary brown. Buttons should have generous internal padding (16px vertical, 32px horizontal).
- **Cards:** Product cards are minimal, featuring full-bleed imagery at the top with a subtle cream background for the text area. Borders are either non-existent or very faint.
- **Chips/Tags:** Used for flavors like "Matcha" or "Ube". These use the named accent colors with a low-opacity background and high-contrast text of the same hue.
- **Input Fields:** Use a subtle `#F5F5F5` fill with a soft 1px border that darkens on focus. Labels should always sit above the field in a bold `label-md` style.
- **Lists:** Ingredient or menu lists should use generous line height and elegant dividers (1px height, faded at the edges) to maintain the airy aesthetic.
- **Modals:** Centered with a heavy backdrop blur to keep the focus on the artisanal product details.
