# Comparison with shadcn/ui

## Modal Dialog

### What I implemented manually

- Focus trap with Tab/Shift+Tab cycling through all focusable elements
- Portal rendering via `createPortal` to avoid z-index stacking issues
- Escape key handler, backdrop click handler, body scroll lock
- `useId()` for stable `aria-labelledby`/`aria-describedby` connections
- Server-safe mounting guard (`useState` + `useEffect`) to prevent SSR `document` errors
- Custom close button with inline SVG X icon

### What shadcn/ui already provides

- `<Dialog>` wraps `@radix-ui/react-dialog` which handles focus trapping, portal, ESC, and ARIA out of the box
- `<DialogTrigger>`, `<DialogOverlay>`, `<DialogContent>`, `<DialogHeader>`, `<DialogTitle>`, `<DialogDescription>`, `<DialogFooter>` — all pre-built
- Animated overlay with fade-in using CSS classes
- Built-in close button (X) positioned absolutely
- Consistent styling via `cn()` utility and Tailwind classes

### What I initially missed

1. **Focus restoration edge case**: My first version did not save `previousActiveElement` before opening. If a user triggered the modal from a button that disappeared (e.g., conditional render), focus would return to `null`. I fixed this by saving a ref to the trigger before the modal opens.

2. **Focusable element detection**: I initially forgot to handle the case where a dialog has zero focusable children. The focus trap would silently fail. I added a guard so the dialog itself receives focus via `tabIndex={-1}` when no focusable elements exist.

### Accessibility lessons learned

- `aria-modal="true"` tells screen readers to ignore content behind the dialog, but the backdrop click handler still needs manual `aria-hidden` management for sibling elements. Since we use `createPortal` to `document.body`, this is handled automatically.
- `aria-describedby` should point to the description text, but is optional. If omitted, screen readers may read the entire dialog content. Providing it gives users a cleaner announcement.
- The focus trap must re-evaluate focusable elements on every Tab press because the DOM can change (e.g., dynamic form fields). Wrapping the query inside the event handler is critical.

---

## Tabs

### What I implemented manually

- Compound component API (`<Tabs>`, `<TabsList>`, `<TabsTab>`, `<TabsPanel>`) with React Context for state sharing
- Controlled + uncontrolled mode via `value`/`defaultValue`/`onValueChange` props
- Roving tabindex: only the selected tab has `tabIndex={0}`, all others `tabIndex={-1}`
- Full keyboard navigation: ArrowLeft/ArrowRight (horizontal), ArrowUp/ArrowDown (vertical), Home, End
- Support for both orientations via `aria-orientation`
- Disabled tab support with `cursor-not-allowed`, reduced opacity, and skip-by-keyboard-navigation

### What shadcn/ui already provides

- `<Tabs>` wraps `@radix-ui/react-tabs` which handles keyboard navigation, roving tabindex, and activation
- `<TabsList>`, `<TabsTrigger>`, `<TabsContent>` — all pre-assembled
- Built-in `disabled` prop on triggers
- Framer Motion animation support for panel transitions
- Consistent styling with `data-[state=active]` attributes

### What I initially missed

1. **`aria-controls` on tabs**: I initially omitted `aria-controls` connecting each tab to its panel. This is critical for screen readers — it tells the user which panel will be revealed when the tab is activated.

2. **Focus vs. selection distinction**: WAI-ARIA supports two activation modes — "automatic" (selection follows focus) and "manual" (selection only changes on click). My implementation uses the automatic mode (Arrow keys both focus and select), which is simpler but may not be preferred for complex forms. A production-ready implementation should support both modes.

### Accessibility lessons learned

- `aria-controls` on each tab must match the `id` of the corresponding panel. This creates an explicit association that screen readers announce.
- The tabpanel should have `tabIndex={0}` when it contains no focusable elements, so keyboard users can Tab into it and scroll its content.
- Roving tabindex is the correct pattern for single-select tab lists. The alternative (keeping all tabs focusable with `aria-selected`) works but the WAI-ARIA Authoring Practices recommend roving tabindex.

---

## Disclosure / Accordion

### What I implemented manually

- `Disclosure` single component with `aria-expanded`, `aria-controls`, `role="region"`, `aria-labelledby`
- `Accordion` wrapper that groups multiple disclosures with a single glass backdrop
- CSS-only open/close animation using `max-height` and `opacity` transitions
- Chevron rotation via inline `transform: rotate()` style
- `useId()` for stable `aria-controls` ID association
- `defaultOpen` prop for initial state

### What shadcn/ui already provides

- `<Accordion>` wraps `@radix-ui/react-accordion` which handles single/multiple mode, keyboard navigation, and collapsible behavior
- `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>` breakdown
- Built-in chevron icon with rotation animation
- `type="single"`/`"multiple"` and `collapsible` props
- Framer Motion-based height animation via `@radix-ui/react-accordion`

### What I initially missed

1. **`role="region"` on the content panel**: Without `role="region"`, screen readers do not automatically announce the panel as a landmark. Adding it with `aria-labelledby` pointing to the trigger creates a named landmark that users can navigate to directly.

2. **CSS animation edge case on initial mount**: The `max-height` animation relies on `scrollHeight`, but `scrollHeight` is 0 before the first render. If `defaultOpen` is true, the animation doesn't play on mount because `maxHeight` starts at `0px` before the ref is populated. A more robust approach would use a `useEffect` to set `maxHeight` after the first paint, or pre-calculate content height.

### Accessibility lessons learned

- The trigger button must be a `<button>` element — never a `<div>` with `onClick`. Buttons are natively focusable and triggerable with Enter/Space.
- `aria-expanded` is the single source of truth for disclosure state. Screen readers announce "expanded" or "collapsed" based on this attribute.
- The `aria-controls` ID must be unique per disclosure instance. Using `useId()` ensures stable, unique IDs in both SSR and client rendering.

---

## Concrete Gaps Between My Implementation and shadcn/ui

### 1. Animation quality

**shadcn/ui** uses Framer Motion for smooth, GPU-accelerated height transitions on the accordion and fade/scale transitions on the dialog overlay. My implementation relies on CSS `max-height` transitions, which can feel janky because `max-height` must be set to an arbitrary large value that doesn't match the exact content height. Framer Motion measures the actual layout height via `useRef` and `requestAnimationFrame` and animates to the precise value, producing significantly smoother results.

### 2. Composable component surface area

**shadcn/ui** exposes 6+ sub-components per compound (e.g., `<DialogTrigger>`, `<DialogOverlay>`, `<DialogContent>`, `<DialogHeader>`, `<DialogFooter>`, `<DialogTitle>`, `<DialogDescription>`), letting consumers compose arbitrary layouts. My components expose a flatter API — for example, `<Modal>` accepts `title`, `description`, and `children` but does not let consumers reorder the header, insert custom footer actions, or replace the close button icon. A production component library needs this flexibility to accommodate diverse design requirements.
