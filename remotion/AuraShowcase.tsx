import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion'

export function AuraShowcase() {
  const frame = useCurrentFrame()

  const warmth = interpolate(frame, [30, 90, 150], [0, 0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const r = Math.round(interpolate(warmth, [0, 1], [74, 255]))
  const g = Math.round(interpolate(warmth, [0, 1], [158, 140]))
  const b = Math.round(interpolate(warmth, [0, 1], [255, 50]))
  const glowColor = `rgba(${r}, ${g}, ${b}, 0.25)`

  const kelvin = Math.round(interpolate(warmth, [0, 0.5, 1], [6500, 4000, 2700]))
  const sceneLabel = warmth < 0.33 ? 'Focus Mode' : warmth < 0.66 ? 'Balanced' : 'Relax Mode'

  return (
    <AbsoluteFill style={{ background: '#080810', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      {/* Animated glow */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%',
        transform: 'translateX(-50%)',
        width: 400, height: 300,
        borderRadius: '50%',
        background: `radial-gradient(ellipse, ${glowColor} 0%, transparent 70%)`,
        filter: 'blur(40px)',
      }} />
      {/* Room silhouette */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
        viewBox="0 0 800 500"
      >
        <polygon points="0,400 200,260 600,260 800,400" fill="none" stroke="#DDDBD6" strokeWidth="1"/>
        <rect x="280" y="310" width="240" height="100" fill="none" stroke="#DDDBD6" strokeWidth="0.8"/>
        <line x1="400" y1="60" x2="400" y2="260" stroke="#DDDBD6" strokeWidth="1"/>
        <circle cx="400" cy="55" r="10" fill="#DDDBD6" opacity="0.6"/>
      </svg>
      {/* Kelvin display */}
      <div style={{
        position: 'absolute', bottom: 60, left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', color: '#DDDBD6',
      }}>
        <div style={{ fontSize: 42, fontWeight: 300, letterSpacing: -1 }}>{kelvin} K</div>
        <div style={{ fontSize: 13, letterSpacing: 4, opacity: 0.5, marginTop: 4 }}>{sceneLabel}</div>
      </div>
      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 30, left: 60, right: 60, height: 1, background: 'rgba(221,219,214,0.1)' }}>
        <div style={{ height: 1, width: `${warmth * 100}%`, background: `rgb(${r},${g},${b})` }} />
      </div>
    </AbsoluteFill>
  )
}
