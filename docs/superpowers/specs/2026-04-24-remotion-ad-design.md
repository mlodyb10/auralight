# Aura Remotion Video Ad — Design Spec

## Goal

A 30-second Instagram Reels / TikTok vertical video ad (1080×1920, 9:16) for Aura smart lighting. Feature-driven narrative: each scene highlights one product capability. Built with Remotion, following the same patterns as the existing Kavka ad.

## Architecture

Remotion project at `E:/projects/aura/remotion-ad/` — standalone directory inside the Aura repo (mirrors the `kavka/remotion-ad/` pattern). Entry: `src/Root.tsx` registers one `AuraAd` composition. All scene logic lives in `src/AuraAd.tsx` as a single file with scene sub-components (same pattern as `KavkaAd.tsx`).

Room images are copied from `../public/room/salon/` into `remotion-ad/public/room/salon/` so `staticFile()` can reference them.

**Tech:** Remotion 4, `@remotion/google-fonts` (Cormorant Garamond + Space Grotesk), TypeScript. No external dependencies beyond what Kavka already uses.

---

## Composition

| Property | Value |
|---|---|
| ID | `AuraAd` |
| Width | 1080px |
| Height | 1920px |
| FPS | 30 |
| Duration | 900 frames (30 seconds) |

---

## Color Palette

```ts
const C = {
  deep:  '#050508',  // near-black background
  cream: '#DDDBD6',  // light text
  red:   '#FF1A00',  // brand accent
  warm:  '#FF8C32',  // warm light orange
  cool:  '#4A9EFF',  // cool light blue
  text:  '#0C0C0C',
}
```

---

## Scene Breakdown

### Scene 1 — Brand Intro (frames 0–120, 0–4s)

**Background:** `C.deep` with red radial glow pulsing in from center.

**Animation:**
- Frame 0–30: nothing (black)
- Frame 15–45: `AURA` logo slides in via clipPath reveal (same `clipPath: 'inset(0 100% 0 0)'` → `'inset(0 0% 0 0)'` as site hero)
- Frame 45–80: tagline fades in below: *"Światło które Cię rozumie."* (Cormorant italic, cream, 36px)
- Frame 90–120: crossfade into Scene 2

**Text:**
- `AURA` — Space Grotesk 900, 140px, cream, letter-spacing 0.3em
- Tagline — Cormorant italic, 36px, `C.cream` 60% opacity

---

### Scene 2 — AI Scenes (frames 100–300, ~3.3–10s)

**Visual:** Full-bleed room image cycling: salon warm → salon neutral → salon cool. Each image fades in over 40 frames using `interpolate` opacity. Cycle: warm (frames 100–160) → neutral (140–220) → cool (200–280).

**Images used:** `staticFile('room/salon/room-warm.jpg')`, `room-neutral.jpg`, `room-cool.jpg`

**Text (slideUp pattern):**
- Frame 180: feature eyebrow: `⚡ AI Scenes` — Space Grotesk 11px, `C.red`, uppercase, tracking 0.3em
- Frame 195: headline: *"Uczy się Twoich nawyków."* — Cormorant italic 64px, `C.cream`
- Frame 220: subline: `"Automatyczne sceny. Zero konfiguracji."` — Space Grotesk 20px, `C.cream` 50%

**Overlay:** Dark gradient at bottom 40% of frame (`linear-gradient(transparent, rgba(5,5,8,0.85))`) so text is legible.

---

### Scene 3 — 16M Colors (frames 280–510, ~9.3–17s)

**Visual:** Salon neutral image as base. Color overlay div cycles through 5 tints using `interpolate` on hue — red (`#FF1A0040`), purple (`#9B59B640`), gold (`#F39C1240`), blue (`#4A9EFF40`), back to neutral. Blend mode `color` on the overlay.

**Hero element:** Large animated number `"16 000 000"` counting up from 0 using `useMotionValue` equivalent in Remotion (`interpolate`). Space Grotesk 900, 96px, white, centered.

**Text:**
- Frame 350: `🎨 16M Colors` eyebrow
- Frame 365: *"Każdy nastrój."* — Cormorant italic 72px, cream
- Frame 385: *"Jeden dotyk."* — Cormorant italic 72px, `C.red`
- Frame 410: subline: `"16 000 000 kolorów. Precyzja ±1 Kelvin."` — Space Grotesk 18px, 50%

---

### Scene 4 — App Control (frames 490–690, ~16.3–23s)

**Visual:** Dark background (`C.deep`). A stylized phone mockup built in pure JSX — rounded rectangle (390×780px), dark glass surface, small status bar. Inside the phone: simplified app UI showing a slider and 3 scene buttons (warm/neutral/cool circles). Behind the phone: soft room glow that changes color as the "finger" taps different scenes.

**Animation:**
- Frame 490–540: phone slides up from bottom (`translateY 200px → 0`)
- Frame 560: first scene button highlighted (warm), glow shifts warm
- Frame 600: second button highlighted (cool), glow shifts cool
- Frame 630: third button highlighted (red tint), glow shifts

**Text:**
- Frame 560: `📱 App Control` eyebrow
- Frame 575: *"Pełna kontrola w kieszeni."* — Cormorant italic 60px, cream
- Frame 600: `"iOS · Android"` — Space Grotesk 18px, 40%

---

### Scene 5 — Tagline (frames 670–810, ~22.3–27s)

**Background:** `C.deep`, minimal grain overlay (SVG data URI, same as KavkaAd).

**Animation (slideUp, staggered):**
- Frame 690: *"Światło które"* — Cormorant italic 88px, `C.cream`
- Frame 715: *"zmienia wszystko."* — Cormorant italic 88px, `C.red`
- Frame 745: thin horizontal line fades in (1px, red, 80px wide)
- Frame 760: `"aura — smart lighting"` — Space Grotesk 18px, cream 40%, tracking 0.2em

---

### Scene 6 — CTA (frames 790–900, ~26.3–30s)

**Background:** `C.deep` with large red radial glow behind logo.

**Animation:**
- Frame 800: `AURA` logo slides in (same as Scene 1, but slightly smaller — 120px)
- Frame 820: URL fades in: `auralight.vercel.app` — Cormorant italic 30px, `C.red`
- Frame 840: promo badge appears: `"30% off · Pierwsze 100 osób"` — Space Grotesk 16px, border `C.red` 40%, pill shape

---

## Animations — Helper Functions

Same pattern as KavkaAd:

```ts
function fade(frame, inStart, inEnd, outStart?, outEnd?)  // opacity interpolation
function slideUp(frame, start, duration = 30)             // opacity + translateY
```

---

## Scene Switching

Opacity-based (same as KavkaAd — no React transitions):

```tsx
<AbsoluteFill style={{ opacity: frame < 125 ? 1 : 0 }}>
  <SceneIntro frame={frame} />
</AbsoluteFill>
// etc.
```

Scenes overlap by ~20 frames for smooth crossfades.

---

## Optional Music

`Audio` component is included but commented out. To enable: place `music.mp3` in `remotion-ad/public/` and uncomment:

```tsx
{/* <Audio src={staticFile('music.mp3')} volume={0.35} /> */}
```

---

## Files

| File | Action |
|---|---|
| `remotion-ad/package.json` | New — Remotion dependencies |
| `remotion-ad/tsconfig.json` | New — TypeScript config |
| `remotion-ad/src/Root.tsx` | New — registers AuraAd composition |
| `remotion-ad/src/AuraAd.tsx` | New — all 6 scenes in one file |
| `remotion-ad/public/room/salon/room-warm.jpg` | Copy from `../public/room/salon/` |
| `remotion-ad/public/room/salon/room-neutral.jpg` | Copy from `../public/room/salon/` |
| `remotion-ad/public/room/salon/room-cool.jpg` | Copy from `../public/room/salon/` |

---

## Out of Scope

- Audio editing / music composition
- Export pipeline / CI rendering
- Multiple format variants (square, landscape)
- Subtitles / captions
