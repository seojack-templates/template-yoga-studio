/**
 * Scoped CSS for the yoga-studio template.
 * EVERY selector must be prefixed with ".yoga-studio-demo" so the styles
 * cannot leak (this matters when the source is seeded into the builder).
 */
export const YOGA_STUDIO_CSS = `
.yoga-studio-demo {
    --ink: #14141a;
    --paper: #ffffff;
    font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
    color: var(--ink);
    background: var(--paper);
}
.yoga-studio-demo * { box-sizing: border-box; }
.yoga-studio-demo h1 { font-size: clamp(2rem, 5vw, 3.5rem); margin: 0 0 1rem; }
`;