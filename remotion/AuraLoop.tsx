import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion'

export function AuraLoop() {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()
  const progress = frame / durationInFrames

  const orbX = interpolate(progress, [0, 0.5, 1], [10, 70, 10])
  const orbY = interpolate(progress, [0, 0.5, 1], [30, 60, 30])
  const redIntensity = interpolate(progress, [0, 0.3, 0.7, 1], [0.06, 0.14, 0.08, 0.06])
  const warmIntensity = interpolate(progress, [0, 0.4, 0.8, 1], [0.12, 0.22, 0.16, 0.12])

  return (
    <AbsoluteFill style={{ background: '#050508', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute',
        left: `${orbX}%`, top: `${orbY}%`,
        width: 600, height: 400,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: `radial-gradient(ellipse, rgba(255,26,0,${redIntensity}) 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        left: `${100 - orbX}%`, top: `${100 - orbY}%`,
        width: 500, height: 350,
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: `radial-gradient(ellipse, rgba(255,140,50,${warmIntensity}) 0%, transparent 70%)`,
        filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(221,219,214,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(221,219,214,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />
    </AbsoluteFill>
  )
}
