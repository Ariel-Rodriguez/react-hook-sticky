// This strategy consist to keep the target sticky to the top and bottom boundary.
// Also it will collide and will sticky to bottom boundary.
// In summary will fill up the gap between top and bottom (viewport or boundaries, any whose collides at first)

// TODO provide css requirements and implementation guide. For now look at example folder.

export const fillBetween = context => {
  const { sticky, boundaryTop, boundaryBottom } = context;
  if (!sticky || !boundaryTop || !boundaryBottom) {
    return;
  }
  const topElementRect = boundaryTop.getBoundingClientRect();
  const bottomElementRect = boundaryBottom.getBoundingClientRect();
  // If the top boundary is visible, then save as offset for further sticky height calculation
  const topOffset = topElementRect.bottom > 0 ? topElementRect.bottom : 0;

  // If the bottom boundary is visible, then save as offset for further sticky height calculation
  const bottomOffset =
    window.innerHeight - bottomElementRect.top > 0
      ? window.innerHeight - bottomElementRect.top
      : 0;

  // Because the sticky element must follow parent width in case the parent has auto or a percentage width.
  sticky.style.width = `${
    sticky.parentElement.getBoundingClientRect().width
  }px`;

  const height = Math.ceil(window.innerHeight - topOffset - bottomOffset);
  sticky.style.height = `${height}px`;

  const computedHeight = Math.ceil(sticky.getBoundingClientRect().height);
  // If the element could not set the height, is because it reached its minimum height.
  if (computedHeight > height) {
    // This point is when sticky collides bottom and there is not space remaining.
    // hence it will stick to bottom and it will being pushed towards top
    sticky.style.top = `${topOffset - computedHeight + height}px`;
  } else {
    sticky.style.top = `${topOffset}px`;
  }
};
