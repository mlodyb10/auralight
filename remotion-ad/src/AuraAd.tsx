import React from 'react'
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
  // Audio,
  staticFile,
  Img,
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
  const warmOp    = fade(frame, 100, 140, 160, 200)
  const neutralOp = fade(frame, 160, 200, 220, 260)
  const coolOp    = fade(frame, 220, 260)

  const eyebrowStyle = slideUp(frame, 180, 25)
  const headStyle    = slideUp(frame, 198, 30)
  const subStyle     = slideUp(frame, 220, 25)

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <AbsoluteFill>
        <Img
          src={staticFile('room/salon/room-warm.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: neutralOp }}>
        <Img
          src={staticFile('room/salon/room-neutral.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: coolOp }}>
        <Img
          src={staticFile('room/salon/room-cool.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{
        background: 'linear-gradient(to top, rgba(5,5,8,0.9) 0%, rgba(5,5,8,0.4) 40%, transparent 65%)',
      }} />
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: '0 80px 160px' }}>
        <div>
          <div style={{
            ...eyebrowStyle,
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 22, fontWeight: 700,
            color: C.red, letterSpacing: '0.3em',
            textTransform: 'uppercase' as const,
            marginBottom: 16,
          }}>
            ⚡ AI Scenes
          </div>
          <div style={{
            ...headStyle,
            fontFamily: 'Cormorant Garamond, serif',
            fontStyle: 'italic',
            fontSize: 72, color: C.cream, lineHeight: 1.1,
            marginBottom: 16,
          }}>
            Uczy się Twoich nawyków.
          </div>
          <div style={{
            ...subStyle,
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 22, color: C.cream,
            opacity: 0.5, letterSpacing: '0.05em',
          }}>
            Automatyczne sceny. Zero konfiguracji.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

function SceneColors({ frame }: { frame: number }) {
  const COLOR_TINTS = [
    `${C.red}55`,
    '#9B59B655',
    '#F39C1255',
    `${C.cool}55`,
    '#2ECC7155',
  ]
  const cycleFrame = frame - 280
  const tintIndex  = Math.floor(cycleFrame / 46) % COLOR_TINTS.length
  const tintNext   = (tintIndex + 1) % COLOR_TINTS.length
  const tintBlend  = interpolate(cycleFrame % 46, [28, 46], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  const counterValue = Math.round(
    interpolate(frame, [320, 430], [0, 16000000], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: outStrong,
    })
  )
  const formattedCounter = counterValue.toLocaleString('pl-PL')

  const eyebrowStyle = slideUp(frame, 350, 25)
  const line1Style   = slideUp(frame, 368, 30)
  const line2Style   = slideUp(frame, 390, 30)
  const subStyle     = slideUp(frame, 412, 25)

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <AbsoluteFill>
        <Img
          src={staticFile('room/salon/room-neutral.jpg')}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: COLOR_TINTS[tintIndex], mixBlendMode: 'color' }} />
      <AbsoluteFill style={{ backgroundColor: COLOR_TINTS[tintNext], mixBlendMode: 'color', opacity: tintBlend }} />
      <AbsoluteFill style={{
        background: 'linear-gradient(to top, rgba(5,5,8,0.92) 0%, rgba(5,5,8,0.5) 45%, transparent 70%)',
      }} />
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: '0 80px 140px' }}>
        <div>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 80, fontWeight: 900,
            color: C.cream, letterSpacing: '-0.02em',
            opacity: fade(frame, 320, 360),
            marginBottom: 32,
            lineHeight: 1,
          }}>
            {formattedCounter}
          </div>
          <div style={{
            ...eyebrowStyle,
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 22, fontWeight: 700,
            color: C.red, letterSpacing: '0.3em',
            textTransform: 'uppercase' as const,
            marginBottom: 16,
          }}>
            🎨 16M Colors
          </div>
          <div style={{ ...line1Style, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 72, color: C.cream, lineHeight: 1.1 }}>
            Każdy nastrój.
          </div>
          <div style={{ ...line2Style, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 72, color: C.red, lineHeight: 1.1, marginBottom: 16 }}>
            Jeden dotyk.
          </div>
          <div style={{ ...subStyle, fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, color: C.cream, opacity: 0.5 }}>
            16 000 000 kolorów. Precyzja ±1 Kelvin.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

function SceneApp({ frame }: { frame: number }) {
  const phoneY = interpolate(frame, [490, 550], [300, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: outStrong,
  })
  const phoneOpacity = fade(frame, 490, 540)

  const btn1Active = frame >= 565 && frame < 610
  const btn2Active = frame >= 610 && frame < 655
  const btn3Active = frame >= 655

  const glowColor = btn3Active ? C.red : btn2Active ? C.cool : C.warm

  const eyebrowStyle = slideUp(frame, 560, 25)
  const headStyle    = slideUp(frame, 578, 30)
  const subStyle     = slideUp(frame, 600, 25)

  const btnStyle = (active: boolean, color: string): React.CSSProperties => ({
    width: 64, height: 64, borderRadius: '50%',
    backgroundColor: active ? color : `${color}40`,
    border: `2px solid ${active ? color : color + '60'}`,
    boxShadow: active ? `0 0 20px ${color}80` : 'none',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: C.deep }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.08, mixBlendMode: 'overlay' }} />
      <div style={{
        position: 'absolute',
        width: 800, height: 800, borderRadius: '50%',
        background: `radial-gradient(circle, ${glowColor}20 0%, transparent 70%)`,
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
      }} />
      <AbsoluteFill style={{
        justifyContent: 'center', alignItems: 'center',
        opacity: phoneOpacity,
        transform: `translateY(${phoneY}px)`,
      }}>
        <div style={{
          width: 380, height: 760,
          borderRadius: 48,
          background: 'linear-gradient(160deg, #1a1a2e, #0d0d1a)',
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column' as const,
          padding: '24px 24px 32px',
          position: 'relative' as const,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>9:41</span>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>●●●</span>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, letterSpacing: '0.2em', color: C.red, textTransform: 'uppercase' as const, marginBottom: 8 }}>
            AURA
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, color: C.cream, marginBottom: 32, lineHeight: 1 }}>
            Salon
          </div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ height: 2, background: `linear-gradient(90deg, ${C.cool}, ${C.warm})`, borderRadius: 1, marginBottom: 12 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, color: C.cool, opacity: 0.7 }}>6500K</span>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, color: C.warm, opacity: 0.7 }}>2700K</span>
            </div>
          </div>
          <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' as const, marginBottom: 16 }}>
            Sceny
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 32 }}>
            <div style={btnStyle(btn1Active, C.warm)} />
            <div style={btnStyle(btn2Active, C.cool)} />
            <div style={btnStyle(btn3Active, C.red)} />
          </div>
          <div style={{ marginTop: 'auto', height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1 }} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ justifyContent: 'flex-end', padding: '0 80px 100px' }}>
        <div>
          <div style={{ ...eyebrowStyle, fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: C.red, letterSpacing: '0.3em', textTransform: 'uppercase' as const, marginBottom: 16 }}>
            📱 App Control
          </div>
          <div style={{ ...headStyle, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 64, color: C.cream, lineHeight: 1.1, marginBottom: 12 }}>
            Pełna kontrola w kieszeni.
          </div>
          <div style={{ ...subStyle, fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, color: C.cream, opacity: 0.5 }}>
            iOS · Android
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

function SceneTagline({ frame }: { frame: number }) {
  const line1  = slideUp(frame, 690, 35)
  const line2  = slideUp(frame, 715, 35)
  const lineOp = fade(frame, 745, 770)
  const sub    = slideUp(frame, 762, 25)

  return (
    <AbsoluteFill style={{ backgroundColor: C.deep, justifyContent: 'center', padding: '0 80px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.1, mixBlendMode: 'overlay' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          ...line1,
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: 96, color: C.cream, lineHeight: 1.05, marginBottom: 8,
        }}>
          Światło które
        </div>
        <div style={{
          ...line2,
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: 96, color: C.red, lineHeight: 1.05, marginBottom: 48,
        }}>
          zmienia wszystko.
        </div>
        <div style={{ opacity: lineOp, width: 80, height: 1, backgroundColor: `${C.cream}30`, marginBottom: 32 }} />
        <div style={{
          ...sub,
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 22, color: `${C.cream}60`,
          letterSpacing: '0.12em', textTransform: 'uppercase' as const,
        }}>
          aura — smart lighting
        </div>
      </div>
    </AbsoluteFill>
  )
}

function SceneCTA({ frame }: { frame: number }) {
  const glowOp    = fade(frame, 790, 830)
  const logoAnim  = slideUp(frame, 800, 30)
  const urlAnim   = slideUp(frame, 822, 25)
  const badgeAnim = slideUp(frame, 842, 25)

  return (
    <AbsoluteFill style={{ backgroundColor: C.deep, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.1, mixBlendMode: 'overlay' }} />
      <div style={{
        position: 'absolute',
        width: 800, height: 800, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.red}20 0%, transparent 70%)`,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: glowOp,
      }} />
      <div style={{ textAlign: 'center' as const, position: 'relative', zIndex: 1 }}>
        <div style={{
          ...logoAnim,
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 120, fontWeight: 900,
          color: C.cream, letterSpacing: '0.25em',
          textTransform: 'uppercase' as const, lineHeight: 1,
        }}>
          AURA
        </div>
        <div style={{
          ...urlAnim,
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic', fontSize: 32,
          color: C.red, letterSpacing: '0.1em', marginTop: 16,
        }}>
          auralight.vercel.app
        </div>
        <div style={{
          ...badgeAnim,
          marginTop: 56,
          display: 'inline-block',
          border: `1px solid ${C.red}60`,
          padding: '14px 44px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 17, fontWeight: 600,
          color: `${C.cream}90`, letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
        }}>
          30% off · Pierwsze 100 osób
        </div>
      </div>
    </AbsoluteFill>
  )
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
