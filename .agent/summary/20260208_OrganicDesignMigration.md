# Walkthrough: Organic Monochrome Redesign

I have successfully refactored the website to adopt an **Organic / Natural (Wabi-sabi)** design aesthetic with a strict **Monochrome** color palette. The design now feels tactile, grounded, and calming, supporting both light and dark modes.

## Key Changes

### 1. Global Design System (`src/app.css`)
- **Typography**: Integrated **Fraunces** (serif) for headings and **Nunito** (sans-serif) for body text.
- **Color Palette**: 
  - **Light Mode**: Pure white background (`#FFFFFF`) with soft gray accents (`#F5F5F5`), using neutral grays for text.
  - **Dark Mode**: Deep neutral black (`#0A0A0A`) with soft white foregrounds (`#FAFAFA`), avoiding pure black/white contrast.
- **Texture**: Applied a global noise/grain texture overlay to create a paper-like, tactile feel.
- **Shapes**: Introduced organic "blob" shapes and rounded corners (`rounded-4xl`, `rounded-full`) throughout.

### 2. Component Refactoring

I refactored all major components to align with the new design system:

#### **Profile (`src/components/Profile.svelte`)**
- **Changes**: 
  - Added a subtle background blob decorator.
  - Updated the profile image with a soft organic container.
  - Refactored buttons to use "pill" shapes (`rounded-full`) with organic hover effects.
  - Styled statistics (Citations, h-index) with serif typography and clean dividers.
  - Social icons are now contained in soft, rounded squares.

#### **Navbar & Footer**
- **Navbar**: updated to a semi-transparent glassmorphism effect (`backdrop-blur-md`) with organic rounded menu items. Improved accessibility by adding keyboard event handlers.
- **Footer**: Simplified to a clean, monochrome design with a rounded top edge (`rounded-t-[2rem]`).

#### **Projects, Awards, Featured, Publications**
- **Cards**: All cards now use large border radii (`rounded-[2rem]`) and soft, diffused shadows instead of harsh borders.
- **Typography**: Headings use the **Fraunces** serif font for a warm, editorial look.
- **Interactions**: Hover states are smoother (`duration-500`), often involving subtle scale or lift effects.
- **Tabs (Publications)**: Updated to organic pill-shaped toggles.

#### **Timeline (`src/components/Timeline.svelte`)**
- **layout**: Maintained the timeline structure but softened the lines (`border-l-2`) and updated colors to the monochrome palette.
- **Typography**: Applied serif fonts to dates for a classic touch.

### 3. UI Refinements (Feedback Iteration)
- **Citation Chart**: Now adapts properly to light/dark modes using CSS variables, ensuring visibility on all backgrounds.
- **Publications Components**: 
  - Standardized all buttons and citation badges to match the `Featured` component style (pill-shaped, organic hover effects).
  - Fixed vertical alignment of the year circle and list items.
  - Unify "Theses" and "Other" sections to use the same consistent list layout as Papers/Conferences, removing inconsistent dot styling and standardizing titles.
- **Awards Component**:
  - Refactored layout to a **Custom Javascript Masonry** grid to ensure balanced columns and eliminate "empty column" issues on wide screens.
  - Removed fixed styling constraints to display images at full width/height without cropping.
  - Eliminated dark mode overlays to ensure image visibility.
- **Featured & Project Cards**:
  - **Projects**: Updated card images to fill the full width (removed padding, switched to `object-cover`) to match `Featured` card aesthetics.
  - **Featured**: Enabled dynamic rendering of Journal Impact Factor/Citation info in the badge area using i18n keys (`{$t(item.badge)}`).

## Verification
- **Build**: Ran `pnpm run build` successfully.
- **Linting**: Addressed CSS import order warnings.
- **Accessibility**: Fixed `tabindex` and `role` issues in the navigation bar.

## Next Steps
- The website is ready for final review.
- You can freely toggle between light and dark modes to see the organic adaptability.

Enjoy your new organic, monochrome portfolio! 🌿⚫⚪
