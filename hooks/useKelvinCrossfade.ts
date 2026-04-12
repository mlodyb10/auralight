import { useState, useEffect } from 'react'
import { useMotionValue, useTransform, animate } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { EASING, COLORS } from '@/lib/constants'

function kelvinLabel(k: number) {
  return k > 5000 ? 'Cool Daylight' : k > 3500 ? 'Neutral White' : 'Warm Amber'
}

export interface KelvinCrossfadeReturn {
  warmth: MotionValue<number>
  sliderVal: number
  hasInteracted: boolean
  kelvinDisplay: string
  neutralOpacity: MotionValue<number>
  warmOpacity: MotionValue<number>
  thumbColor: MotionValue<string>
  thumbShadow: MotionValue<string>
  kelvinColor: MotionValue<string>
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function useKelvinCrossfade(initialValue = 50): KelvinCrossfadeReturn {
  const warmth = useMotionValue(initialValue)
  const [sliderVal, setSliderVal] = useState(initialValue)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [kelvinDisplay, setKelvinDisplay] = useState(() => {
    const k = Math.round((6500 + (2700 - 6500) * initialValue / 100) / 100) * 100
    return `${k} K — ${kelvinLabel(k)}`
  })

  const neutralOpacity = useTransform(warmth, [0, 50],   [0, 1], { clamp: true })
  const warmOpacity    = useTransform(warmth, [50, 100], [0, 1], { clamp: true })
  const thumbColor     = useTransform(warmth, [0, 100], [COLORS.cool as string, COLORS.warm as string])
  const thumbShadow    = useTransform(warmth, [0, 100], [`0 0 10px ${COLORS.cool}80`, `0 0 10px ${COLORS.warm}80`])
  const kelvinColor    = useTransform(warmth, [0, 100], [COLORS.cool as string, COLORS.warm as string])
  const kelvinMv       = useTransform(warmth, [0, 100], [6500, 2700])

  useEffect(() => {
    animate(warmth, sliderVal, { duration: 0.6, ease: EASING.editorial })
  }, [sliderVal, warmth])

  useEffect(() => {
    return kelvinMv.on('change', v => {
      const k = Math.round(v / 100) * 100
      setKelvinDisplay(`${k} K — ${kelvinLabel(k)}`)
    })
  }, [kelvinMv])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setHasInteracted(true)
    setSliderVal(Number(e.target.value))
  }

  return { warmth, sliderVal, hasInteracted, kelvinDisplay, neutralOpacity, warmOpacity, thumbColor, thumbShadow, kelvinColor, handleChange }
}
