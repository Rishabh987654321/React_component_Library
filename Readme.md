# @rishabh_7775/react-component-library

An accessible, themeable React component library and design system with Storybook documentation, published to npm.

[![npm version](https://img.shields.io/npm/v/@rishabh_7775/react-component-library.svg?style=flat-square)](https://www.npmjs.com/package/@rishabh_7775/react-component-library)
[![Storybook](https://img.shields.io/badge/Storybook-Live_Docs-ff69b4.svg?style=flat-square)](https://6a5f5b15811622401a531594-jqzcmtbzal.chromatic.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Live Storybook Documentation

**[Explore Live Storybook Documentation →](https://6a5f5b15811622401a531594-jqzcmtbzal.chromatic.com/)**

---

## Installation

```bash
npm install @rishabh_7775/react-component-library
```

---

## Quickstart

Import the `ThemeProvider`, components, and compiled stylesheet into your application:

```tsx
import React from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, ThemeProvider } from '@rishabh_7775/react-component-library';
import '@rishabh_7775/react-component-library/style.css';

export function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="p-6 max-w-md mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Design System</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Email Address" placeholder="you@example.com" />
            <Button variant="primary" size="md">
              Submit Form
            </Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

---

## Features

- **16 Production-Ready Components** categorized across 4 main design system categories:
  - **Inputs**: `Button`, `Input`, `Checkbox`, `Radio` & `RadioGroup`, `Select`, `Switch`
  - **Feedback**: `Badge`, `Alert`, `Toast`, `Spinner`
  - **Overlays**: `Modal` (with `focus-trap-react`), `Tooltip`, `Popover`
  - **Data Display**: `Card` (compound components), `Table` (semantic HTML), `Tabs` (roving `tabIndex`)
- **Light/Dark Design Token Architecture**: CSS custom properties managed via `ThemeProvider` respecting system preferences by default.
- **Accessible by Default**: Fully keyboard operable controls (`Tab`, `Space`, `Enter`, `Escape`, arrow key navigation) with appropriate ARIA roles (`role="dialog"`, `role="switch"`, `role="alert"`, `role="tablist"`).
- **Automated Accessibility Testing**: Verified with `vitest-axe` and `axe-core` across unit test suites.
- **Visual Regression Protection**: Storybook snapshot baseline diffing configured with Chromatic for light and dark modes.
- **TypeScript First**: Bundled single-file declaration types (`index.d.ts` and `style.css.d.ts`) providing prop autocomplete out of the box.

---

## Component Catalog

| Category | Component | Key Accessibility & Feature Highlights |
| :--- | :--- | :--- |
| **Inputs** | `Button` | Native `<button>`, loading spinner with `aria-busy="true"`, `focus-ring` styling |
| | `Input` | Explicit label association via `id`/`htmlFor`, `aria-invalid`, `aria-describedby` |
| | `Checkbox` | Native `<input type="checkbox">` visually styled with keyboard indicator focus |
| | `Radio` | Semantic `<fieldset>` & `<legend>` container with native radio keyboard groups |
| | `Select` | Styled native `<select>` for platform-native dropdown accessibility |
| | `Switch` | `role="switch"`, `aria-checked`, keyboard focus ring toggling |
| **Feedback**| `Badge` | Status indicator badges with WCAG AA token contrast |
| | `Alert` | `role="alert"` for high priority warnings and `role="status"` for notifications |
| | `Toast` | Dynamic status toast banner with auto-dismiss pause on hover/focus |
| | `Spinner` | Standalone loading indicator with `role="status"` and `sr-only` text |
| **Overlays** | `Modal` | `createPortal` overlay dialog (`role="dialog"`, `aria-modal="true"`) with focus trapping & `Escape` close |
| | `Tooltip` | `role="tooltip"` triggered on mouse hover AND keyboard focus |
| | `Popover` | Interactive popover panel with click-outside and `Escape` dismissal |
| **Data Display** | `Card` | Compound layout (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) |
| | `Table` | Semantic HTML `<table>` markup with column headers (`<th scope="col">`) |
| | `Tabs` | WAI-ARIA `role="tablist"` pattern with roving `tabIndex` & arrow key navigation |

---

## Tech Stack

- **Framework & Core**: React 18/19, TypeScript, Vite (Library mode)
- **Styling**: Tailwind CSS, Class Variance Authority (`cva`), `clsx`, `tailwind-merge`
- **Documentation**: Storybook 8 (`@storybook/react-vite`), MDX Docs, `@storybook/addon-a11y`
- **Testing & Quality**: Vitest, `@testing-library/react`, `vitest-axe`, Chromatic (Visual Regression CI)

---

## Local Development Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/Rishabh987654321/React_component_Library.git
cd React_component_Library
npm install
```

Start the interactive Storybook environment:

```bash
npm run storybook
```

Run unit and automated `axe` accessibility tests:

```bash
npm run test
```

Build production package distribution:

```bash
npm run build
```

---

## License

[MIT](LICENSE) © Rishabh
