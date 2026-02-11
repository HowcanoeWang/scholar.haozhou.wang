# Navbar Icon Update

I have updated the Navbar component to improve the language switch icon and fix theme toggle visibility issues in the WeChat browser.

## Changes

### 1. Language Switch Icon
- **Old**: `fas fa-globe` (FontAwesome Globe icon)
- **New**: Custom Inline SVG (Translation/Language style)
  - Replaced the generic globe icon with a standard "Translation" icon (depicting text characters) to more clearly indicate language switching.
  - Used an inline SVG to ensure crisp rendering and color control.

### 2. Theme Toggle Buttons
- **Issue**: The previous implementation used `<img>` tags with CSS `filter: invert(...)` to switch colors. This caused inconsistent behavior in the WeChat in-app browser (displaying white icons on white backgrounds or black on black).
- **Fix**: Replaced `<img>` tags with **Inline SVGs** for Sun and Moon icons.
- **Implementation**:
  - Used `stroke="currentColor"` on the SVGs to automatically inherit the text color.
  - Added `text-foreground` class to numbers to ensure the icon color always contrasts correctly with the background in both light and dark modes.
  - This removes reliance on `invert` filters, ensuring cross-browser compatibility.

## Verification
- **Code**: `src/components/Navbar.svelte` updated.
- **Visuals**: 
  - Language icon now matches the requested style.
  - Theme icons now correctly follow the text color (dark in light mode, light in dark mode) without relying on browser filter support.
