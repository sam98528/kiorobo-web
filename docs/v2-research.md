# KIOROBO v2 — Reference Research

> Compiled April 2026. Research across responsive design, full-page scroll animation, and premium card design for the KIOROBO website redesign.

---

## 1. Responsive Design References

### 1.1 [Apple.com](https://www.apple.com)
- **Breakpoints**: Primary breakpoints at 734px, 1068px, and 1440px. Uses a narrow set of breakpoints rather than many granular ones.
- **Layout Strategy**: Content-first responsive approach. Product grids collapse from multi-column to single-column. Hero sections scale images fluidly with `max-width: 100%` and swap image assets at breakpoints for art-direction (different crops for mobile vs desktop). Typography scales between breakpoints using a combination of viewport units and fixed sizes. Heavy use of CSS Grid with `auto-fit` / `minmax()` for product tile layouts.
- **Mobile Nav**: Hamburger icon (three-line) that opens a full-screen overlay menu. Only three elements remain in the mobile header: hamburger, Apple logo, and shopping bag icon. Footer navigation collapses into accordion sections.
- **Why it's good**: Apple sets the standard for device-agnostic design. Their approach of art-directing images per breakpoint (not just shrinking them) ensures every viewport gets an intentional visual experience. The minimal mobile header is a masterclass in restraint.

### 1.2 [Stripe.com](https://stripe.com)
- **Breakpoints**: Approximately 670px (mobile), 880px (tablet), 1080px (small desktop), 1280px (large desktop). Uses fluid spacing between breakpoints with `clamp()`.
- **Layout Strategy**: CSS Grid-based layouts that reflow from 3-4 columns on desktop to single-column on mobile. Feature sections use a "text + illustration" side-by-side pattern that stacks vertically on mobile with text first. Extensive use of `clamp()` for fluid typography (e.g., headings scale smoothly from ~28px to ~56px). SVG illustrations and animations scale proportionally. Code examples use horizontal scroll on mobile rather than shrinking.
- **Mobile Nav**: Hamburger menu that opens a slide-down panel with grouped navigation sections. Retains the "Sign in" and "Contact sales" CTAs visible in the mobile header alongside the hamburger.
- **Why it's good**: Stripe's fluid typography approach eliminates jarring layout shifts between breakpoints. Their decision to keep primary CTAs visible on mobile (not hidden in the hamburger) is conversion-optimized. The side-by-side-to-stack pattern is clean and predictable.

### 1.3 [Linear.app](https://linear.app)
- **Breakpoints**: ~640px (mobile), ~768px (tablet), ~1024px (desktop), ~1280px (wide). Follows a Tailwind-like breakpoint system.
- **Layout Strategy**: Dark theme with minimal layout complexity. Feature sections use a centered single-column layout on mobile that expands to two-column on desktop. Product screenshots scale within containers and swap to mobile-specific crops. Grid-based feature card layouts go from 1-col to 2-col to 3-col. Uses generous whitespace that scales proportionally.
- **Mobile Nav**: Compact top bar with logo and hamburger. Menu opens as a full-screen overlay with large touch targets. Simple, flat navigation structure without nested dropdowns.
- **Why it's good**: Linear proves that a dark-themed corporate site can be fully responsive without feeling cramped. Their generous spacing and large text on mobile make it feel native-app quality. The single-column mobile feature layout reads like a well-paced story.

### 1.4 [Vercel.com](https://vercel.com)
- **Breakpoints**: ~640px, ~768px, ~1024px, ~1280px (matches Tailwind defaults: sm, md, lg, xl). Built with Next.js and Tailwind CSS using their own Geist design system.
- **Layout Strategy**: Mobile-first grid system. Hero sections use responsive text that scales via Tailwind utility classes (`text-2xl md:text-4xl lg:text-6xl`). Feature grids use `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Terminal/code demos switch from fixed-width to full-bleed on mobile. Animations are reduced or simplified on mobile for performance.
- **Mobile Nav**: Hamburger icon opening a slide-down panel. Top-level links visible immediately; sub-navigation accessible through expandable sections. Login/signup buttons remain visible outside the hamburger.
- **Why it's good**: As a Next.js + Tailwind reference implementation, Vercel's own site is the canonical example of these technologies used together. Their approach to reducing animation complexity on mobile is important for KIOROBO to follow. The Geist design system provides consistent spacing and typography scales.

### 1.5 [Notion.so](https://www.notion.so)
- **Breakpoints**: ~480px, ~768px, ~1024px, ~1280px. Uses a custom CSS system rather than a framework.
- **Layout Strategy**: Clean, illustration-heavy layouts that use CSS Flexbox for most sections. Illustrations scale proportionally within flex containers. Feature comparison sections switch from side-by-side to stacked with a tab interface on mobile. Uses a mix of system fonts and custom fonts with responsive `font-size` declarations. Template galleries switch from grid to horizontal scroll carousel on mobile.
- **Mobile Nav**: Hamburger menu with a clean slide-out drawer. Mobile header retains the logo and a primary CTA ("Get Notion free"). The drawer groups links by category with clear section headers.
- **Why it's good**: Notion demonstrates how to handle complex content (feature comparisons, template galleries, pricing tables) responsively. Their approach of converting grids to horizontal scroll carousels on mobile is a pattern KIOROBO should consider for card-heavy sections.

### Recommendation for KIOROBO

**Breakpoints**: Adopt a 4-breakpoint system aligned with Tailwind defaults:
- `sm`: 640px (large phones)
- `md`: 768px (tablets)
- `lg`: 1024px (small desktops)
- `xl`: 1280px (large desktops)

**Layout Strategy**:
- Mobile-first CSS with Tailwind utility classes
- Use `clamp()` for fluid typography (like Stripe) rather than discrete size jumps
- Feature sections: side-by-side on desktop, stacked on mobile (text first, image second)
- Card grids: 1-col on mobile, 2-col on tablet, 3-col on desktop
- Consider horizontal scroll carousels for card collections on mobile (like Notion)
- Reduce or disable GSAP animations on mobile for performance (like Vercel)

**Mobile Navigation**:
- Hamburger with full-screen overlay (like Linear) for the dark theme aesthetic
- Keep primary CTA visible outside the hamburger (like Stripe/Vercel)
- Large touch targets (minimum 44px) with generous spacing

---

## 2. Full-Page Scroll References

### 2.1 [Apple Product Pages (e.g., apple.com/iphone)](https://www.apple.com/iphone/)
- **Technique**: GSAP ScrollTrigger with `pin: true` for each product section. Each section pins to the viewport while internal content animates (text fades, images scale, colors shift). Uses `scrub: true` to link animation progress directly to scroll position. Sections have defined scroll distances that control animation duration.
- **Transitions**: Crossfade between sections with parallax depth layers. Background colors transition smoothly. Product images scale from small to full-bleed as you scroll into a section, then scale back as you leave. Text elements use staggered fade-in with upward motion.
- **Content Handling**: Sections have variable internal content but consistent scroll-distance ratios. Longer content sections get proportionally more scroll distance. Uses `min-height: 100vh` rather than fixed `height: 100vh` to accommodate overflow. ScrollTrigger `end` values are calculated dynamically based on content height.
- **Why it's good**: Apple pioneered the "cinematic scroll" pattern for product marketing. Their approach of using scroll distance (not snap) to control pacing gives users agency while maintaining the intended narrative flow. This is the gold standard for product storytelling via scroll.

### 2.2 [Locomotive.ca Agency Portfolio](https://locomotive.ca)
- **Technique**: Uses their own Locomotive Scroll library integrated with GSAP ScrollTrigger via `scrollerProxy()`. Sections use smooth inertia scrolling with configurable friction. Pin functionality achieved through ScrollTrigger integration. Data attributes (`data-scroll-speed`, `data-scroll-class`) control per-element behavior declaratively.
- **Transitions**: Layered parallax with different scroll speeds per element. Sections reveal by sliding over the previous section (stacking card effect). Text elements use `data-scroll-class` to trigger CSS transitions when entering the viewport. Background images have negative scroll speeds creating depth.
- **Content Handling**: Modular `data-scroll-section` approach allows variable-height sections within the smooth-scroll container. Each section is independent and can contain any amount of content. GPU-accelerated transforms ensure smooth performance.
- **Why it's good**: Locomotive's approach is declarative and modular, making it easier to maintain than pure GSAP implementations. The "sections sliding over each other" effect creates a tactile, card-deck feeling that is distinctive without being disorienting.

### 2.3 [Awwwards SOTD — Immersive Scroll Portfolio](https://www.awwwards.com/sites/immersive-scroll-portfolio)
- **Technique**: Full-viewport sections with CSS `scroll-snap-type: y mandatory` combined with GSAP for internal animations. Each section is `height: 100vh` with `scroll-snap-align: start`. GSAP ScrollTrigger handles animations within each snapped section, triggered by the snap completion event.
- **Transitions**: Each section has a unique entrance animation: scale-up reveals, horizontal wipes, and opacity fades. Internal content staggers in after the section snaps into position. Uses `IntersectionObserver` as a lightweight trigger for non-animated elements.
- **Content Handling**: Content is designed to fit within one viewport height. Where content exceeds viewport, the section uses internal scroll (nested scrollable area) while the outer snap container handles section-to-section movement.
- **Why it's good**: The hybrid CSS snap + GSAP approach is pragmatic: CSS handles the snap mechanics natively (better performance, accessibility, and mobile support) while GSAP handles the rich animations within each section. This separation of concerns is the most maintainable pattern.

### 2.4 [DJI Product Showcase Pages](https://www.dji.com)
- **Technique**: GSAP ScrollTrigger with combined pinning and timeline scrubbing. A wrapper element pins while an internal GSAP timeline plays through multiple visual states (background image scales in, text fades, overlay appears). Uses `scrub: 1` for smooth catch-up to scroll position. Multiple ScrollTrigger instances chained sequentially.
- **Transitions**: Background images scale from 0.8 to 1.0 as sections pin. Text slides up with opacity. Color overlays fade in/out between sections. Product specs animate with counter effects. Video playback tied to scroll position using ScrollTrigger's `onUpdate` to set `video.currentTime`.
- **Content Handling**: Tall pinned sections (200-300vh scroll distance) allow complex multi-step animations within a single pinned area. Content is broken into "scenes" within each pin, each with its own timeline segment. Dynamic `end` calculations based on scene count.
- **Why it's good**: DJI demonstrates how to tell a complex product story within pinned sections by breaking animations into sequential scenes. The scroll-linked video playback is particularly effective for product demos. This multi-scene-per-pin approach handles the "variable content" problem elegantly.

### 2.5 [Codrops — Cinematic 3D Scroll Experiences with GSAP](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/)
- **Technique**: Full tutorial demonstrating GSAP ScrollTrigger with Three.js or CSS 3D transforms for cinematic depth. Sections pin with `pin: true` and use `snap` configuration for section-level snapping: `snap: { snapTo: 1 / (sections.length - 1), duration: 0.5, ease: "power2.inOut" }`. Combines pinning with snap for a presentation-like feel.
- **Transitions**: 3D camera movements between sections (dolly, pan, rotate). Parallax layers at different z-depths. Sections "fly in" from different directions. Background particle effects respond to scroll velocity. Lighting changes per section.
- **Content Handling**: Uses a container approach where all sections exist in a single scrollable area with a total height of `(sections * 100vh)`. Each section's content is absolutely positioned within its viewport-sized container. Overflow content handled via CSS `overflow: hidden` with priority given to design constraints.
- **Why it's good**: This is a technical deep-dive that shows the full implementation pattern for GSAP snap + pin. The `snap` configuration object with `snapTo`, `duration`, and `ease` parameters is exactly the API KIOROBO needs. The tutorial covers performance considerations including `will-change`, `transform3d` for GPU acceleration, and cleanup patterns for React/Next.js.

### Implementation Approaches Compared

| Approach | Pros | Cons |
|----------|------|------|
| **CSS `scroll-snap` only** | Native performance, great mobile support, simple | No animation control between snaps, limited transition effects |
| **GSAP `snap` only** | Full animation control, smooth transitions, programmable | Heavier JS, potential mobile jank, fights native scroll |
| **CSS snap + GSAP animations** | Best of both: native snap + rich animations | Two systems to coordinate, snap timing can conflict with animation timing |
| **GSAP `pin` + `scrub`** | Cinematic control, scroll-linked animations | No snap behavior (continuous scroll), requires careful content sizing |
| **GSAP `pin` + `snap` + `scrub`** | Full control: pinning, snapping, and scrub animations | Most complex to implement, requires thorough mobile testing |

### Recommendation for KIOROBO

**Primary approach**: GSAP ScrollTrigger with `pin` + `snap` for a presentation/slide feel.

**Implementation pattern**:
```javascript
// Each section is 100vh, pinned with snap
const sections = gsap.utils.toArray('.section');

sections.forEach((section, i) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    pin: true,
    pinSpacing: true,
    snap: {
      snapTo: 1,
      duration: { min: 0.3, max: 0.6 },
      ease: 'power2.inOut'
    }
  });

  // Internal animations per section
  gsap.from(section.querySelectorAll('.animate-in'), {
    y: 60,
    opacity: 0,
    stagger: 0.15,
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1
    }
  });
});
```

**Key considerations**:
- Use `@gsap/react` hook (`useGSAP`) for proper cleanup in Next.js
- Disable snap on mobile (use normal scroll with fade-in animations instead) for better UX
- Set `min-height: 100vh` not `height: 100vh` to handle edge cases
- Use `will-change: transform` on pinned elements for GPU acceleration
- Test extensively on iOS Safari (known issues with pinned scroll)
- Consider `ScrollSmoother` for the inertia/momentum feel between snaps
- GSAP is now free (acquired by Webflow in 2024), so no licensing concerns

---

## 3. Card Design References

### 3.1 [Linear.app Features Page](https://linear.app/features)
- **Card Style**: Dark background (#0A0A0B or similar near-black) cards with very subtle 1px borders in a slightly lighter gray (#1A1A1E). Cards contain a headline, short description, and a product screenshot or illustration. Typography-driven hierarchy with Inter font. No heavy gradients or flashy effects — the premium feeling comes from restraint and spacing.
- **Background Treatment**: Solid dark backgrounds with occasional subtle radial gradient overlays (very soft purple/blue glow behind key elements). No pastel fills. Transparent or near-transparent card backgrounds that let the page background show through.
- **Hover Effects**: Subtle border brightness increase on hover (border goes from 8% to 15% opacity). Slight scale transform (`scale(1.01)`). No dramatic color changes. Some cards show a soft glow at the border that follows the cursor position.
- **Why it's good**: Linear's cards feel premium specifically because they do less. The dark background, restrained color palette, and generous whitespace signal confidence and professionalism. This is the opposite of the "AI-generated pastel gradient" look — it's editorial, quiet, and lets the content speak. The cursor-following glow is a modern touch that feels intentional, not decorative.

### 3.2 [Raycast.com](https://raycast.com)
- **Card Style**: Dark theme cards with rich gradient accents used sparingly (only on featured/hero cards). Most cards use a dark surface (#1C1C1E) with subtle rounded corners (12-16px radius). Cards often contain small product UI screenshots that serve as the primary visual, making the cards feel like windows into the product. Uses a warm-to-cool gradient palette (purple, blue, pink) for accent elements.
- **Background Treatment**: Cards sit on a near-black page background. Featured cards use a subtle mesh gradient or soft color wash behind them. Standard cards use flat dark fills with 1px borders. Some sections use a faint grid pattern on the background that adds texture without competing with content.
- **Hover Effects**: Cards lift with `translateY(-2px)` and gain a subtle drop shadow. Border color shifts from neutral gray to a muted accent color. Featured cards intensify their gradient glow on hover. Smooth transitions (200-300ms ease).
- **Why it's good**: Raycast shows how to use color gradients tastefully on dark backgrounds — sparingly and only for emphasis. The "window into the product" approach (showing real UI in cards) instantly communicates value. The grid background texture adds depth without the heavy-handed feel of full gradient fills.

### 3.3 [Stripe.com Dashboard / Feature Pages](https://stripe.com)
- **Card Style**: Clean, light-themed cards with very subtle shadows (not box shadows, but ambient occlusion-style soft shadows). Cards use real product screenshots, code snippets, or data visualizations as primary content. Thin borders (1px #E3E8EF or similar). Generous internal padding (24-32px). Cards often have a small colored accent bar or icon at the top for categorization.
- **Background Treatment**: White or very light gray (#FAFAFA) card backgrounds on a white page — differentiation through shadow and spacing rather than color fills. Some feature cards use gradient backgrounds but they are photorealistic or abstract art, not flat color gradients. The famous "Stripe gradient" (animated mesh gradient) appears only in hero sections, never on feature cards.
- **Hover Effects**: "Flashlight" border effect where a radial gradient follows the cursor across a grid of cards, making the nearest card's border glow softly. Subtle `translateY(-1px)` lift. Shadow depth increases slightly. Transitions are smooth and understated (150-200ms).
- **Why it's good**: Stripe's flashlight border effect is the gold standard for card hover interactions — it creates a cohesive, living grid that responds to the user. Their cards feel premium because they contain real content (screenshots, code, data) rather than abstract illustrations. The restraint in background treatment (white on white, differentiated by shadow) is a hallmark of confident design.

### 3.4 [Vercel.com Features / Product Pages](https://vercel.com)
- **Card Style**: Dark theme with the Geist design system. Cards use a dark surface color (#111111) with 1px borders (#333). Rounded corners (8-12px). Cards prominently feature terminal output, code snippets, or deployment UI screenshots. Monospace font (Geist Mono) for code elements creates a technical, developer-focused aesthetic. Cards often contain interactive demos or animated content.
- **Background Treatment**: Near-black page (#000) with cards as slightly lighter surfaces. Some sections use a radial gradient glow (blue/purple) as a background accent behind card groups. No card-level gradient backgrounds. Occasional use of dotted grid patterns behind card sections.
- **Hover Effects**: Border color shifts from gray to white or accent blue. Subtle glow appears around the card (using `box-shadow` with a colored spread). Interactive cards may trigger internal animations on hover (e.g., a terminal command starts typing). Clean transitions (200ms ease-out).
- **Why it's good**: Vercel demonstrates how cards can be interactive showcases rather than static containers. The dark-on-darker approach with crisp borders is the "Linear style" executed with a developer focus. Using actual product UI (terminal output, deployment logs) as card content makes every card a proof of capability.

### 3.5 [Loom.com / Figma.com Feature Pages](https://www.figma.com)
- **Card Style**: Light theme with generous whitespace. Cards use large-format product screenshots or video thumbnails as the dominant visual (60-70% of card area). Minimal text below: bold headline, one line of description. Very thin borders or no borders at all — cards are defined by spacing and shadow alone. Rounded corners (12-16px). Some cards span full width for emphasis, breaking the grid rhythm.
- **Background Treatment**: White or warm off-white backgrounds (#FEFEFE). Cards have no distinct background color — they blend with the page. Differentiation comes from the screenshot/video content and the shadow. Occasional sections use a light gradient wash (warm peach, soft lavender) behind card groups for visual breaks.
- **Hover Effects**: Video thumbnails auto-play on hover. Scale transform (`scale(1.02)`) with shadow elevation increase. Some cards reveal additional text or a CTA button on hover. Smooth spring-like transitions (300ms with slight overshoot).
- **Why it's good**: Figma proves that cards don't need decorative backgrounds at all. Their approach of letting product screenshots dominate the card makes the design feel editorial (like a magazine layout) rather than templatey. The video-on-hover pattern is engaging without being overwhelming. Full-width "break" cards prevent the grid from feeling monotonous.

### Anti-Patterns to Avoid (Current KIOROBO Issues)
- Solid pastel gradient fills on card backgrounds (screams "template" or "AI-generated")
- Uniform card sizing with no visual hierarchy variation
- Abstract/generic illustrations instead of real product content
- High-saturation colors as card backgrounds
- Thick, visible borders with no hover state differentiation
- Cards that all look identical with no rhythm variation

### Recommendation for KIOROBO

**Primary direction**: Linear/Vercel dark-theme card style — dark cards on a dark background, differentiated by subtle borders and hover states.

**Specific treatments**:

1. **Card backgrounds**: Dark surface (#111 or #1A1A1E) with 1px border (#2A2A2E). No pastel gradients. No solid color fills. Let the dark theme create the premium feel.

2. **Visual content**: Use product screenshots, UI demos, or short video loops as the primary card visual. If using illustrations, make them line-art or monochrome, not colorful abstractions.

3. **Typography hierarchy**: Bold headline (16-18px), muted description text (#888 on dark), generous padding (24-32px).

4. **Hover interactions** (choose one or combine):
   - **Cursor-following border glow** (Stripe flashlight effect): A radial gradient follows the mouse across the card grid, illuminating the nearest card's border. Implementation uses CSS custom properties updated via `mousemove` event.
   - **Subtle lift + border brighten** (Linear style): `translateY(-2px)`, border opacity from 10% to 25%, transition 200ms.
   - **Accent glow** (Vercel style): `box-shadow: 0 0 20px rgba(accent-color, 0.15)` on hover.

5. **Grid rhythm**: Mix card sizes. Use 2/3 + 1/3 splits, full-width feature cards, and standard grid cards to create visual variety and hierarchy.

6. **Implementation with Tailwind**:
```jsx
{/* Standard feature card */}
<div className="group rounded-xl border border-white/[0.08] bg-white/[0.03] p-6
                hover:border-white/[0.15] hover:bg-white/[0.05]
                transition-all duration-200 ease-out">
  <div className="aspect-video rounded-lg bg-white/[0.02] overflow-hidden mb-4">
    {/* Product screenshot or demo */}
  </div>
  <h3 className="text-lg font-semibold text-white mb-2">Feature Name</h3>
  <p className="text-sm text-white/60">Short description of the feature.</p>
</div>

{/* Hero feature card (full-width) */}
<div className="col-span-full rounded-xl border border-white/[0.08]
                bg-gradient-to-br from-white/[0.04] to-transparent p-8">
  {/* Larger format with side-by-side layout */}
</div>
```

---

## Sources

### Responsive Design
- [BrowserStack — Responsive Design Breakpoints 2025](https://www.browserstack.com/guide/responsive-design-breakpoints)
- [DEV Community — Responsive Breakpoints Playbook](https://dev.to/gerryleonugroho/responsive-design-breakpoints-2025-playbook-53ih)
- [Tailwind CSS — Responsive Design Docs](https://tailwindcss.com/docs/responsive-design)
- [A List Apart — Apple and Responsive Design](https://alistapart.com/blog/post/apple-and-responsive-design/)
- [UXPin — Responsive Design Best Practices & Examples](https://www.uxpin.com/studio/blog/best-practices-examples-of-excellent-responsive-design/)
- [Webstacks — Responsive Design Checklist 2025](https://www.webstacks.com/blog/responsive-design-guide)

### Full-Page Scroll
- [GSAP ScrollTrigger Official Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAPify — ScrollTrigger Complete Guide](https://gsapify.com/gsap-scrolltrigger)
- [Codrops — Cinematic 3D Scroll with GSAP](https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/)
- [CodePen — Full Page Snap with ScrollTrigger + ScrollTo](https://codepen.io/urbgimtam/pen/XWXdypQ)
- [CodePen — GSAP Horizontal Snapping Sections](https://codepen.io/GreenSock/pen/YzygYvM)
- [Marmelab — Trigger Animations on Scroll with GSAP](https://marmelab.com/blog/2024/04/11/trigger-animations-on-scroll-with-gsap-scrolltrigger.html)
- [HTMLBurger — Best Scrolling Websites 2025](https://htmlburger.com/blog/best-scrolling-websites/)
- [Awwwards — Best Scroll Websites](https://www.awwwards.com/websites/scrolling/)
- [fullPage.js](https://alvarotrigo.com/fullPage/)

### Card Design
- [Medium — The Rise of Linear Style Design](https://medium.com/design-bootcamp/the-rise-of-linear-style-design-origins-trends-and-techniques-4fd96aab7646)
- [LogRocket — Linear Design: The SaaS Trend](https://blog.logrocket.com/ux-design/linear-design/)
- [Frontend Horse — The Linear Look](https://frontend.horse/articles/the-linear-look/)
- [BricxLabs — Card UI Design Examples 2025](https://bricxlabs.com/blogs/card-ui-design-examples)
- [Creatorfuel — Card Design Inspiration](https://www.creator-fuel.com/inspiration/cards)
- [FreeFrontend — CSS Card Hover Effects](https://freefrontend.com/css-card-hover-effects/)
- [Onyx8 — Glassmorphism Examples](https://onyx8agency.com/blog/glassmorphism-inspiring-examples/)
- [NateBal — Glassmorphism Web Design](https://natebal.com/glassmorphism-web-design/)
