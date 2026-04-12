export function applyRipple(event) {
  const target = event.currentTarget
  if (!target) {
    return
  }

  const rect = target.getBoundingClientRect()
  const diameter = Math.max(rect.width, rect.height)
  const radius = diameter / 2

  const existingRipple = target.querySelector('.button-ripple')
  if (existingRipple) {
    existingRipple.remove()
  }

  const ripple = document.createElement('span')
  ripple.className = 'button-ripple'
  ripple.style.width = `${diameter}px`
  ripple.style.height = `${diameter}px`
  ripple.style.left = `${event.clientX - rect.left - radius}px`
  ripple.style.top = `${event.clientY - rect.top - radius}px`

  target.appendChild(ripple)
}
