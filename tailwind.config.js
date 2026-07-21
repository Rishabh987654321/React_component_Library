/** @type {import('tailwindcss').Config} */
// Reconciled from two sources: the raw Stitch HTML/Tailwind config (concrete
// extracted values: surfaces, borders, code-block colors) and the written
// DESIGN.md brief (deliberate choices — notably a real blue accent color,
// since Stitch's own config used flat black for "primary," which doesn't
// give a component library a distinguishable "this is interactive" signal).
// Where they conflicted, the written brief wins.

export default {
    darkMode: 'class',
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}',
        './.storybook/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // ---- SURFACES ----
                surface: {
                    DEFAULT: '#F7F9FB',       // page background (light)
                    lowest: '#FFFFFF',        // cards, preview panels (light)
                    subtle: '#F2F4F6',        // sidebar / nav background (light)
                    muted: '#ECEEF0',         // hover backgrounds, table stripes (light)
                    high: '#E6E8EA',          // table header bg, active toolbar (light)
                    dark: '#0A0A0A',          // page background (dark) — per written brief
                    'dark-lowest': '#131316', // cards, preview panels (dark)
                    'dark-subtle': '#18181B', // sidebar / nav background (dark)
                    'dark-muted': '#1F1F23',  // hover backgrounds, table stripes (dark)
                    'dark-high': '#27272A',   // table header bg, active toolbar (dark)
                },

                // ---- BORDERS ----
                border: {
                    DEFAULT: '#C6C6CD',   // outline-variant (light) — hairlines
                    strong: '#76777D',    // outline (light) — dividers, focus outlines
                    dark: '#2A2A2E',      // outline-variant (dark)
                    'dark-strong': '#45464D', // outline (dark)
                },

                // ---- TEXT ----
                text: {
                    DEFAULT: '#191C1E',    // on-surface (light)
                    muted: '#45464D',      // on-surface-variant (light)
                    dark: '#EFF1F3',       // inverse-on-surface (dark)
                    'dark-muted': '#A1A1AA', // on-surface-variant (dark)
                },

                // ---- ACCENT ----
                // Per written DESIGN.md brief: a distinct blue, reserved strictly for
                // interactive indicators, focus states, active sidebar links — kept
                // separate from primary text color (which stays near-black/near-white).
                accent: {
                    DEFAULT: '#3B82F6',      // interactive elements (light)
                    hover: '#2563EB',
                    subtle: '#DBEAFE',       // active sidebar bg, selected states (light)
                    dark: '#60A5FA',         // brightened for AA contrast on dark bg
                    'dark-hover': '#3B82F6',
                    'dark-subtle': 'rgba(59, 130, 246, 0.12)', // active sidebar bg (dark)
                },

                // ---- STATUS ----
                success: { DEFAULT: '#059669', bg: '#D1FAE5' },
                warning: { DEFAULT: '#D97706', bg: '#FEF3C7' },
                danger: {
                    DEFAULT: '#BA1A1A',
                    dark: '#FFB4AB',
                    bg: '#FFDAD6',
                    'bg-dark': '#93000A',
                },

                // ---- CODE BLOCK ----
                // Deliberately the same dark background in both light and dark mode
                // (standard convention — code blocks don't follow the page toggle).
                code: {
                    bg: '#0F172A',
                    text: '#94A3B8',
                    keyword: '#7DD3FC',
                    string: '#34D399',
                    tag: '#F87171',
                    attr: '#FDE047',
                    comment: '#64748B',
                },
            },

            // ---- TYPOGRAPHY ----
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['Geist', 'Inter', 'sans-serif'], // headings
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'], // code, prop types
            },
            fontSize: {
                'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
                'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }],
                'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
                code: ['13px', { lineHeight: '20px', fontWeight: '400' }],
                'headline-sm': ['20px', { lineHeight: '28px', fontWeight: '500' }],
                'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
                'headline-lg': ['30px', { lineHeight: '36px', letterSpacing: '-0.02em', fontWeight: '600' }],
            },

            // ---- PAGE-LEVEL SPACING (docs site layout) ----
            spacing: {
                'sidebar-w': '280px',
                'content-max': '768px',
                gutter: '1.5rem',
                'stack-sm': '0.5rem',
                'stack-md': '1rem',
                'stack-lg': '2rem',

                // ---- COMPONENT-LEVEL TOKENS ----
                // These belong to the actual components the library ships (Button,
                // Input, etc.), not just the docs site chrome around them.
                'btn-h-sm': '32px',
                'btn-h-md': '40px',
                'btn-h-lg': '48px',
                'btn-px-sm': '12px',
                'btn-px-md': '16px',
                'btn-px-lg': '20px',
                'input-h-sm': '32px',
                'input-h-md': '40px',
                'input-h-lg': '48px',
                'badge-px': '8px',
                'badge-py': '2px',
            },

            // ---- BORDER RADIUS ----
            // "Soft" shape language per the written brief: small, crisp radius for
            // interactive elements, slightly larger for containers. Deliberately
            // NOT pill-shaped — reflects the structured/rectangular feel of code.
            borderRadius: {
                DEFAULT: '4px',   // buttons, inputs, badges
                sm: '2px',
                lg: '8px',        // cards, code blocks, containers
                xl: '12px',
                full: '9999px',   // only for avatars/dots, not buttons
            },

            boxShadow: {
                // Tonal/outline-based elevation per the written brief — shadows are
                // a last resort, always paired with a solid border, never alone.
                popover: '0 4px 12px rgba(0,0,0,0.05)',
                'focus-ring': '0 0 0 2px rgba(59, 130, 246, 0.4)',
            },

            ringWidth: {
                DEFAULT: '2px', // focus ring width per accessibility requirement
            },
            ringOffsetWidth: {
                DEFAULT: '2px', // focus ring offset per accessibility requirement
            },
        },
    },
    plugins: [],
};