import { useScroll, useTransform, MotionValue } from 'framer-motion'

export function useScrollGlow(): {
  blob1Y: MotionValue<number>
  blob2Y: MotionValue<number>
  blob1Opacity: MotionValue<number>
} {
  const { scrollY } = useScroll()
  const blob1Y = useTransform(scrollY, [0, 800], [0, -40])
  const blob2Y = useTransform(scrollY, [0, 800], [0, 30])
  const blob1Opacity = useTransform(scrollY, [0, 400], [1, 0.3])
  return { blob1Y, blob2Y, blob1Opacity }
}
