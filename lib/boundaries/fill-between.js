// This strategy consist to keep the target sticky to the top boundary.
// Also it will collide and will sticky to bottom boundary.
// As plus it will set the height to fill the viewport if any of top ro bottom boundary are not in viewport.
export const fillBetween = context => {
  const { sticky, boundaryTop, boundaryBottom } = context
  if (!sticky || !boundaryTop || !boundaryBottom) {
    return
  }

  const stickyElementRect = sticky.getBoundingClientRect()
  const topElementRect = boundaryTop.getBoundingClientRect()
  const bottomElementRect = boundaryBottom.getBoundingClientRect()

  // If the top boundary is visible, then save as offset for further sticky height calculation
  const topOffset = topElementRect.bottom > 0 ? topElementRect.bottom : 0

  // If the bottom boundary is visible, then save as offset for further sticky height calculation
  const bottomOffset =
    window.innerHeight - bottomElementRect.top > 0
      ? window.innerHeight - bottomElementRect.top
      : 0

  // Fill the screen as much as possible.
  sticky.style.height = `${window.innerHeight - topOffset - bottomOffset}px`

  // Because the sticky element must follow parent width in case the parent has auto or a percentage width.
  sticky.style.width = `${sticky.parentElement.getBoundingClientRect().width}px`

  if (bottomOffset > stickyElementRect.height) {
    // When the sticky collides with bottom and has to be sticky to bottom.
    sticky.style.top = `${bottomElementRect.top - stickyElementRect.height}px`
  } else {
    // Otherwise stick to top
    sticky.style.top = `${topOffset}px`
  }
}
