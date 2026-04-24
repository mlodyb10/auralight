import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
  // Audio,
  // useVideoConfig,
  // staticFile,
  // Img,
} from 'remotion'

// ── Palette ────────────────────────────────────────────────────────────────
const C = {
  deep:  '#050508',
  cream: '#DDDBD6',
  red:   '#FF1A00',
  warm:  '#FF8C32',
  cool:  '#4A9EFF',
}

const outStrong = Easing.bezier(0.23, 1, 0.32, 1)

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

// ── Helpers ────────────────────────────────────────────────────────────────
function fade(frame: number, inStart: number, inEnd: number, outStart?: number, outEnd?: number) {
  if (outStart !== undefined && outEnd !== undefined) {
    const safeOutStart = Math.max(outStart, inEnd + 1)
    return interpolate(
      frame,
      [inStart, inEnd, safeOutStart, outEnd],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: outStrong },
    )
  }
  return interpolate(frame, [inStart, inEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: outStrong,
  })
}

function slideUp(frame: number, start: number, duration = 30) {
  const progress = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: outStrong,
  })
  return {
    opacity: progress,
    transform: `translateY(${(1 - progress) * 40}px)`,
  }
}

// ── Scene placeholders ────────────────────────────────────────────────────
function SceneIntro({ frame }: { frame: number }) {
  const glowOpacity = fade(frame, 0, 60)
  const logoOpacity = fade(frame, 15, 45)
  const tagOpacity  = fade(frame, 45, 80)

  return (
    <AbsoluteFill style={{ backgroundColor: C.deep, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.08, mixBlendMode: 'overlay' }} />

      {/* Red glow */}
      <div style={{
        position: 'absolute',
        width: 700, height: 700, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.red}18 0%, transparent 70%)`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: glowOpacity,
      }} />

      {/* AURA logo — clipPath reveal */}
      <div style={{
        opacity: logoOpacity,
        clipPath: `inset(0 ${interpolate(frame, [15, 45], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: outStrong })}% 0 0)`,
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 140, fontWeight: 900,
        letterSpacing: '0.3em',
        color: C.cream,
        textTransform: 'uppercase' as const,
        lineHeight: 1,
        textAlign: 'center' as const,
      }}>
        AURA
      </div>

      {/* Tagline */}
      <div style={{
        position: 'absolute',
        bottom: '38%',
        ...slideUp(frame, 45, 25),
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontSize: 36,
        color: C.cream,
        opacity: tagOpacity * 0.6,
        letterSpacing: '0.08em',
        textAlign: 'center' as const,
      }}>
        Światło które Cię rozumie.
      </div>
    </AbsoluteFill>
  )
}

function SceneAI({ frame }: { frame: number }) {
  return <AbsoluteFill style={{ backgroundColor: '#111' }} />
}

function SceneColors({ frame }: { frame: number }) {
  return <AbsoluteFill style={{ backgroundColor: '#111' }} />
}

function SceneApp({ frame }: { frame: number }) {
  return <AbsoluteFill style={{ backgroundColor: C.deep }} />
}

function SceneTagline({ frame }: { frame: number }) {
  return <AbsoluteFill style={{ backgroundColor: C.deep }} />
}

function SceneCTA({ frame }: { frame: number }) {
  return <AbsoluteFill style={{ backgroundColor: C.deep }} />
}

// ── Main composition ──────────────────────────────────────────────────────
export function AuraAd() {
  const frame = useCurrentFrame()

  return (
    <AbsoluteFill style={{ backgroundColor: C.deep }}>
      <AbsoluteFill style={{ opacity: frame < 125 ? 1 : 0 }}>
        <SceneIntro frame={frame} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: frame >= 100 && frame < 305 ? 1 : 0 }}>
        <SceneAI frame={frame} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: frame >= 280 && frame < 515 ? 1 : 0 }}>
        <SceneColors frame={frame} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: frame >= 490 && frame < 695 ? 1 : 0 }}>
        <SceneApp frame={frame} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: frame >= 670 && frame < 815 ? 1 : 0 }}>
        <SceneTagline frame={frame} />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: frame >= 790 ? 1 : 0 }}>
        <SceneCTA frame={frame} />
      </AbsoluteFill>
      {/* <Audio src={staticFile('music.mp3')} volume={0.35} /> */}
    </AbsoluteFill>
  )
}
