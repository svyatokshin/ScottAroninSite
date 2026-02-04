# Scott Aronin — Brand & Design System Guide

> A senior UI/UX design reference for maintaining visual consistency across the mind-body wellness platform.

---

## Design Philosophy

**Brand essence:** Calm, trustworthy, transformative. The palette evokes sky, breath, and inner stillness—supporting the mind-body wellness narrative without feeling clinical or corporate.

**Principles:**
- **Depth through layering:** Gradients and soft overlays create dimension without harsh edges
- **Restraint:** Limited accent use; blue drives action, neutrals carry content
- **Accessibility first:** Contrast and focus states meet WCAG AA minimums

---

## 1. Brand Colors (Primary Palette)

### Primary Blues — Action & Trust

| Token | Hex | RGB | HSL | Role |
|-------|-----|-----|-----|------|
| **Deep Blue** | `#0D47A1` | 13, 71, 161 | 215°, 85%, 34% | Primary buttons (default), FAB |
| **Medium Blue** | `#1565C0` | 21, 101, 192 | 210°, 80%, 42% | Button hover, link accent |
| **Accent Blue** | `#0046C9` | 0, 70, 201 | 220°, 100%, 39% | Shadows, radial overlays, borders |
| **Accent Blue 2** | `#1055C9` | 16, 85, 201 | 217°, 85%, 43% | Subtle radial overlays |
| **Focus Ring** | `#2563EB` | 37, 99, 235 | 217°, 91%, 53% | `:focus-visible` (accessibility) |

**Usage rules:**
- **Buttons:** Default `#0D47A1`, hover `#1565C0`, never mix with zen palette for CTAs
- **Links:** `#1565C0` for inline links; hover darken to `#0D47A1`
- **Shadows:** Always use Accent Blue (`#0046C9`) for brand-tinted shadows—never raw black

**Contrast (WCAG AA):**
- `#0D47A1` on white: ~7.2:1 ✓
- `#1565C0` on white: ~5.1:1 ✓
- `#1565C0` on `#BBE9FF`: ~4.5:1 ✓ (large text)

---

## 2. Background Palette — Atmosphere

### Sky Gradients (Light → Dark)

| Token | Hex | Usage |
|-------|-----|-------|
| **Sky Light** | `#BBE9FF` | Page BG start, card fills, primary sections |
| **Sky Mid** | `#AFDDFF` | Page BG end, card gradients, section blend |
| **Sky Soft** | `#AEDEFC` | Card variant, softer gradient option |
| **Sky Alt** | `#9DD0EB` | Alternate sections (e.g. services), emphasis blocks |
| **Sky Muted** | `#8FC5E0` | Alternate gradient end, footer transitions |

**Gradient formulas:**
```
/* Primary page background */
linear-gradient(to bottom, #BBE9FF, #AFDDFF)

/* Section with depth */
linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)

/* Card fill */
linear-gradient(to bottom right, #AEDEFC, #AFDDFF, #BBE9FF)

/* Section variant (e.g. services) */
linear-gradient(to bottom right, #BBE9FF, #9DD0EB)
```

### Semantic Background Tokens (Tailwind)

Map these in `tailwind.config` for consistency:

| Token | Hex | Purpose |
|-------|-----|---------|
| `bgLight-1` | `#BBE9FF` | Lightest sky |
| `bgLight-2` | `#AFDDFF` | Mid sky |
| `bgLight-3` | `#AEDEFC` | Soft sky |
| `bgLight-4` | `#9DD0EB` | Alt section, nav/footer base |
| `bgDark-1` | `#0D47A1` | Deep blue (accent) |
| `bgDark-2` | `#1565C0` | Medium blue (borders, hovers) |
| `bgDark-3` | `#0046C9` | Accent blue (shadows) |
| `bgNeutral-cream` | `#FAFAF5` | Warm white |
| `bgNeutral-eggshell` | `#F5F5F0` | Warm off-white |

### White & Neutral Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| White | `#FFFFFF` | Cards, nav surface, overlays, inputs |
| Warm 1 | `#F5F5F0` | Subtle section gradients, soft transitions |
| Warm 2 | `#FAFAF5` | Subtle section gradients, cream overlay |

---

## 3. Zen Palette — Decorative & Emotional

Used for **radial overlays**, **decorative glows**, and **ambient accents**—not primary UI controls.

| Token | Light | Default | Dark |
|-------|-------|---------|------|
| **zen-blue** | `#E6F3FF` | `#4A90E2` | `#2C5282` |
| **zen-purple** | `#F3E6FF` | `#9B51E0` | `#6B46C1` |
| **zen-yellow** | `#FFF9E6` | `#F6E05E` | `#D69E2E` |

**Usage:**
- **Radial overlays:** `from-zen-purple/10`, `to-zen-blue/5` — low opacity only
- **Decorative blurs:** `bg-zen-purple-light/10`, `bg-zen-blue-light/10` with `blur-2xl`
- **Borders (subtle):** `border-zen-blue/20`, `from-zen-purple/20`
- **Never:** Solid zen colors for primary buttons or body text

---

## 4. Hero & Display Accents

| Token | Hex | Usage |
|-------|-----|-------|
| Sky Blue 1 | `#87CEEB` | Hero gradient text start |
| Sky Blue 2 | `#5DADE2` | Hero gradient text mid |
| Sky Blue 3 | `#3498DB` | Hero gradient text end |
| Sky Glow | `#38BDF8` | Radial accent (sky-400 equivalent) |
| Warm Overlay | `rgba(255,215,102,0.10)` | Hero golden tint overlay |

**Hero gradient text:**
```css
background: linear-gradient(to right, #87CEEB, #5DADE2, #3498DB);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

---

## 5. Typography & Neutrals

### Text Colors

| Token | Hex | Usage | Contrast |
|-------|-----|-------|----------|
| Black | `#000000` | Body text, strong emphasis | N/A |
| Gray 900 | `#111827` | Headings, primary text | 16.2:1 on white |
| Gray 800 | `#1F2937` | Nav, links, secondary text | 13.0:1 |
| Gray 600 | `#4B5563` | Hover states, tertiary text | 6.9:1 |
| Gray 200 | `#E5E7EB` | Borders, dividers | — |
| White | `#FFFFFF` | Hero text, buttons on dark, nav on overlay | — |

### Font System

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Body | Lato | 300, 400, 700, 900 | All body, nav, forms |
| Display | Cormorant Garamond | 300–700 | Headings, hero, elegant type |

**CSS vars:** `--font-lato`, `--font-cormorant`

---

## 6. Shadows (Brand-Tinted)

All shadows use Accent Blue (`#0046C9` / `rgba(0,70,201,...)`) for brand alignment.

| Role | Value |
|------|-------|
| **Card** | `0 10px 40px -12px rgba(0,70,201,0.15), 0 0 0 1px rgba(0,70,201,0.1)` |
| **Card hover** | `0 20px 60px -12px rgba(0,70,201,0.2), 0 0 0 1px rgba(0,70,201,0.15)` |
| **Button / CTA** | `0 4px 32px 0 rgba(0,70,201,0.25)` |
| **Modal / overlay** | Same as card hover |

**Rule:** Do not use pure black (`rgba(0,0,0,...)`) for primary UI shadows.

---

## 7. UI States & Feedback

### Scrollbar
| Part | Hex |
|------|-----|
| Track | `#F5F5F5` |
| Thumb | `#CCCCCC` |
| Thumb hover | `#999999` |

### Focus & Selection
| State | Value |
|-------|-------|
| Focus ring | `2px solid #2563EB`, `outline-offset: 2px` |
| Selection | `background: rgba(37, 99, 235, 0.2)` |

### Interaction States (Buttons)
| State | Treatment |
|-------|-----------|
| Default | `bg-[#0D47A1]` |
| Hover | `bg-[#1565C0]`, slight scale (1.02–1.05) |
| Focus | Ring `#2563EB` at 60% opacity |
| Disabled | `opacity-50`, `cursor-not-allowed` |

### Borders
| Context | Value |
|---------|-------|
| Cards | `border-bgDark-2/20` or `1px rgba(0,70,201,0.1)` |
| Inputs | `border-bgDark-2/50` |
| Input focus | `ring-2 ring-bgDark-2/60`, `border-bgDark-2/60` |

---

## 8. Component Specifications

### Cards
- **Background:** `linear-gradient(to bottom right, #AEDEFC, #AFDDFF, #BBE9FF)`
- **Border:** `1px solid rgba(22, 101, 192, 0.2)`
- **Shadow:** Card shadow (see §6)
- **Radius:** `1.5rem` (24px) to `2rem` (32px)
- **Hover:** Scale 1.02, stronger shadow, border at 30% opacity

### Buttons (Primary)
- **Background:** `#0D47A1`
- **Hover:** `#1565C0`, `scale(1.05)`
- **Padding:** `px-8 py-3` to `px-12 py-4`
- **Radius:** `rounded-full` (pill)
- **Min touch target:** 44×44px

### Form Inputs
- **Background:** `white` or `white/90` with `backdrop-blur-sm`
- **Border:** `border-bgDark-2/50`
- **Focus:** `ring-2 ring-bgDark-2/60`
- **Placeholder:** `text-gray-500/60`
- **Min height:** 44px

### Section Dividers
- **Line:** `h-px` with `bg-gradient-to-r from-bgDark-2/50 via-transparent to-bgDark-2/50`
- **Ornamental:** Short gradient lines (e.g. `w-12 h-px`) flanking headings

---

## 9. Layout & Spacing

### Section Padding
- **Mobile:** `py-16` (4rem)
- **Tablet:** `py-24` (6rem)
- **Desktop:** `py-32` (8rem)

### Gradient Overlays (Section Transitions)
- **Top fade:** `from-white via-white/60 via-bgNeutral-eggshell/35 via-bgLight-3/20 to-transparent`
- **Bottom fade:** `from-white via-white/60 via-bgNeutral-eggshell/35 via-bgNeutral-cream/15 to-transparent`

### Decorative Elements
- **Radial glows:** Low opacity (5–10%), large blur (`blur-2xl`, `blur-3xl`)
- **Float animation:** 6s ease-in-out infinite, ±10–20px translateY
- **Zen fade:** 4s ease-in-out infinite, opacity 0.5–0.8

---

## 10. Accessibility Checklist

- [ ] **Focus:** All interactive elements have visible `:focus-visible` ring (#2563EB)
- [ ] **Contrast:** Text meets WCAG AA (4.5:1 normal, 3:1 large)
- [ ] **Touch targets:** Minimum 44×44px for all taps
- [ ] **Selection:** Custom `::selection` maintains readability
- [ ] **Reduced motion:** Respect `prefers-reduced-motion` (consider disabling decorative animations)

---

## 11. Do's and Don'ts

| Do | Don't |
|----|-------|
| Use brand blue for primary CTAs | Use zen colors for primary buttons |
| Layer gradients for depth | Use flat solid fills for sections |
| Apply Accent Blue to shadows | Use black-tinted shadows |
| Use Warm 1/2 for section transitions | Use pure gray for transitions |
| Maintain 44px min touch targets | Use smaller tap areas on mobile |
| Test focus visibility | Rely on hover-only affordances |

---

## 12. Design Tool Export

**Figma / Sketch variables:**
- Primary: `#0D47A1`, `#1565C0`
- Background: `#BBE9FF`, `#AFDDFF`, `#AEDEFC`
- Accent: `#0046C9`, `#2563EB`
- Neutrals: `#111827`, `#1F2937`, `#4B5563`, `#E5E7EB`
- Zen: `#E6F3FF`, `#4A90E2`, `#F3E6FF`, `#9B51E0`, `#FFF9E6`, `#F6E05E`

**Implementation:** Prefer `tailwind.config.ts` tokens and this document over hardcoded hex in components. When adding semantic tokens (`bgLight-*`, `bgDark-*`, `bgNeutral-*`), map them to the values in §2 and use class names in components.
