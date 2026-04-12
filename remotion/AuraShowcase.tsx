import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion'


function kelvinToRGB(k: number): [number, number, number] {
  // Simplified cool→warm color mapping
  const t = interpolate(k, [2700, 6500], [1, 0])
  const r = Math.round(interpolate(t, [0, 1], [74,  255]))
  const g = Math.round(interpolate(t, [0, 1], [158, 200]))
  const b = Math.round(interpolate(t, [0, 1], [255,  50]))
  return [r, g, b]
}

export function AuraShowcase() {
  const frame = useCurrentFrame()

  // warmth: 0 (cool) → 1 (warm) over 180 frames with pause at midpoint
  const warmth = interpolate(frame, [20, 80, 100, 160], [0, 0.5, 0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const kelvin = Math.round(interpolate(warmth, [0, 0.5, 1], [6500, 4000, 2700]))
  const sceneLabel = warmth < 0.33 ? 'Focus Mode' : warmth < 0.66 ? 'Balanced' : 'Relax Mode'

  const [r, g, b] = kelvinToRGB(kelvin)
  const accentColor = `rgb(${r},${g},${b})`

  // Spectrum bar progress (highlight position)
  const spectrumPos = interpolate(warmth, [0, 1], [0, 100])

  // Big number count-up opacity
  const numOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const labelOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })

  return (
    <AbsoluteFill style={{
      background: '#08080E',
      overflow: 'hidden',
      fontFamily: '"Cormorant Garamond", "Georgia", serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* Ambient glow behind the number */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -60%)',
        width: 500, height: 400,
        borderRadius: '50%',
        background: `radial-gradient(ellipse, rgba(${r},${g},${b},0.12) 0%, transparent 70%)`,
        filter: 'blur(60px)',
        pointerEvents: 'none',
      }} />

      {/* Main kelvin number */}
      <div style={{
        position: 'relative',
        textAlign: 'center',
        opacity: numOpacity,
        marginBottom: 12,
      }}>
        <div style={{
          fontSize: 120,
          fontWeight: 300,
          color: '#DDDBD6',
          letterSpacing: -4,
          lineHeight: 1,
        }}>
          {kelvin.toLocaleString()}
        </div>
        <div style={{
          fontSize: 22,
          fontWeight: 300,
          color: '#DDDBD6',
          letterSpacing: 6,
          opacity: 0.35,
          marginTop: -6,
        }}>
          KELVIN
        </div>
      </div>

      {/* Scene label */}
      <div style={{
        textAlign: 'center',
        opacity: labelOpacity,
        marginBottom: 64,
      }}>
        <div style={{
          fontSize: 11,
          letterSpacing: 8,
          color: accentColor,
          textTransform: 'uppercase',
          fontFamily: 'sans-serif',
          fontWeight: 400,
        }}>
          {sceneLabel}
        </div>
      </div>

      {/* Spectrum bar */}
      <div style={{
        position: 'absolute',
        bottom: 48,
        left: 60, right: 60,
      }}>
        {/* Labels */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginBottom: 8,
          fontFamily: 'sans-serif',
          fontSize: 9, letterSpacing: 3,
          color: '#DDDBD6', opacity: 0.25,
          textTransform: 'uppercase',
        }}>
          <span>6500 K — Cool Daylight</span>
          <span>2700 K — Warm Amber</span>
        </div>

        {/* Gradient track */}
        <div style={{
          width: '100%', height: 1,
          background: 'linear-gradient(90deg, rgb(74,158,255) 0%, rgb(255,220,160) 50%, rgb(255,140,50) 100%)',
          opacity: 0.4,
          position: 'relative',
        }}>
          {/* Moving indicator dot */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `${spectrumPos}%`,
            transform: 'translate(-50%, -50%)',
            width: 6, height: 6,
            borderRadius: '50%',
            background: accentColor,
            boxShadow: `0 0 12px ${accentColor}`,
          }} />
        </div>

        {/* Filled progress */}
        <div style={{
          marginTop: -1, height: 1,
          width: `${spectrumPos}%`,
          background: `linear-gradient(90deg, rgb(74,158,255), ${accentColor})`,
          opacity: 0.7,
        }} />
      </div>

      {/* Corner label */}
      <div style={{
        position: 'absolute', top: 28, left: 36,
        fontFamily: 'sans-serif',
        fontSize: 9, letterSpacing: 5,
        color: '#DDDBD6', opacity: 0.18,
        textTransform: 'uppercase',
      }}>
        Aura — Light Intelligence
      </div>
    </AbsoluteFill>
  )
}
