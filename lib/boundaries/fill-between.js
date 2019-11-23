// This strategy consist to keep the target sticky to the top and bottom boundary. (Fill content)
// Also it will collide and will sticky to bottom boundary.
// In summary will fill up the gap between top and bottom (viewport or boundaries, any whose collides at first)

// TODO provide css requirements and implementation guide. For now look at example folder.

// Requires of following layout
// A Node as Top Boundary ref 'top'
// A ParentWrapper [css:] position relative, width and height could be in percentage
//    > Sticky (Target) [css:] optional min-height
// A Node as Bottom Boundary ref 'bottom'

export const fillBetween = context => {
  const { sticky, top, bottom } = context.boundaries;

  if (!sticky || !top || !bottom) {
    return;
  }
  const stickyEl = sticky.element;
  const topElementRect = top.element.getBoundingClientRect();
  const bottomElementRect = bottom.element.getBoundingClientRect();

  const topBoundary = topElementRect.bottom;
  const bottomBoundary = window.innerHeight - bottomElementRect.top;

  // If the top boundary is visible (not negative value), then save as offset for further sticky height calculation
  const topOffset = topBoundary > 0 ? topElementRect.bottom : 0;
  // If the bottom boundary is visible (not negative value), then save as offset for further sticky height calculation
  const bottomOffset = bottomBoundary > 0 ? bottomBoundary : 0;

  // Avoiding to become sticky when the top boundary is present.
  // Letting the browser to perform flex layout flow instead of unnecessary fixed positions.
  if (topOffset && stickyEl.style.position === 'fixed') {
    stickyEl.style.position = null;
    return;
  }

  if (stickyEl.style.position !== 'fixed') {
    stickyEl.style.position = 'fixed';
  }

  // Because the sticky element must follow parent width in case the parent has auto or a percentage width.
  const parentWidth = stickyEl.parentElement.getBoundingClientRect().width;
  if (parentWidth !== stickyEl.style.width) {
    stickyEl.style.width = `${parentWidth}px`;
  }

  const height = Math.ceil(window.innerHeight - topOffset - bottomOffset);
  stickyEl.style.height = `${height}px`;

  const computedHeight = Math.ceil(stickyEl.getBoundingClientRect().height);
  // If the element could not set the height, is because it reached its minimum height.
  if (computedHeight > height) {
    // This point is when sticky collides bottom and there is not space remaining.
    // hence it will stick to bottom and it will being pushed towards top
    stickyEl.style.top = `${topOffset - computedHeight + height}px`;
  } else {
    stickyEl.style.top = `${topOffset}px`;
  }
};
