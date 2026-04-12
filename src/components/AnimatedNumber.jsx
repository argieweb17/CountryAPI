import { useEffect, useRef, useState } from 'react'

function AnimatedNumber({ value, duration = 700, formatter }) {
  const [displayValue, setDisplayValue] = useState(
    typeof value === 'number' ? value : null
  )
  const frameIdRef = useRef(null)
  const previousValueRef = useRef(typeof value === 'number' ? value : 0)

  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(null)
      return () => {}
    }

    const startValue = previousValueRef.current
    const delta = value - startValue

    if (delta === 0) {
      setDisplayValue(value)
      return () => {}
    }

    let startTime

    const step = (timestamp) => {
      if (startTime === undefined) {
        startTime = timestamp
      }

      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      const nextValue = startValue + delta * easedProgress

      setDisplayValue(nextValue)

      if (progress < 1) {
        frameIdRef.current = window.requestAnimationFrame(step)
      } else {
        previousValueRef.current = value
        setDisplayValue(value)
      }
    }

    frameIdRef.current = window.requestAnimationFrame(step)

    return () => {
      if (frameIdRef.current) {
        window.cancelAnimationFrame(frameIdRef.current)
      }
    }
  }, [duration, value])

  if (displayValue === null) {
    return 'N/A'
  }

  const roundedValue = Math.round(displayValue)

  if (typeof formatter === 'function') {
    return formatter(roundedValue)
  }

  return roundedValue.toString()
}

export default AnimatedNumber
