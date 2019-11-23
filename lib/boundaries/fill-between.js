/**
 * This strategy consist to keep sticky attached on top with next requirements:
 * - The sticky must be able to grow towards bottom
 * - The sticky must collide with bottom boundary (Screen or Element)
 * - The sticky must resize when resizing screen
 * - The sticky must respect its minimum height
 * - If the sticky collides at bottom and there is not enough space to grow up, then it will be sticky to bottom boundary.


// TODO provide css requirements and implementation guide. For now look at example folder.

// Requires of following layout
// A Node as Top Boundary ref 'top'
// A ParentWrapper [css:] position relative, width and height could be in percentage
//    > Sticky (Target) [css:] optional min-height
// A Node as Bottom Boundary ref 'bottom'
*/
import { getBoundingClientRect, setStyle } from '../commons';

export const fillBetween = context => {
  const { sticky, top, bottom } = context.boundaries;

  if (!sticky || !top || !bottom) {
    return;
  }
  const stickyEl = sticky.element;
  const [stickyParentRect, topRect, bottomRect] = getBoundingClientRect([
    stickyEl.parentElement,
    top.element,
    bottom.element,
  ]);
  const topBoundary = topRect.bottom > 0 ? topRect.bottom : 0;
  const bottomBoundary =
    bottomRect.top < window.innerHeight ? bottomRect.top : window.innerHeight;
  const gapBetweenBoundaries = bottomBoundary - topBoundary;

  const nextPosition = {
    'max-height': gapBetweenBoundaries,
  };

  if (topBoundary === 0) {
    nextPosition.position = 'fixed';
    nextPosition.top = 0;

    if (sticky.params.minHeight > gapBetweenBoundaries) {
      nextPosition.top = null;
      nextPosition.bottom = window.innerHeight - bottomBoundary;
    }
  } else {
    nextPosition.position = 'absolute';
    nextPosition.top = 0;
  }

  // Because the sticky element must follow parent width in case the parent has auto or a percentage width.
  const parentWidth = stickyParentRect.width;
  if (parentWidth !== stickyEl.style.width) {
    nextPosition.width = parentWidth;
  }

  setStyle(stickyEl, nextPosition);
};
