/**
 * This plugin consist to keep sticky attached on top with next requirements:
 * - The sticky must be able to grow towards bottom
 * - The sticky must collide with bottom boundary (Screen or Element)
 * - The sticky must resize when resizing screen
 * - The sticky must respect its minimum height
 * - If the sticky collides at bottom and there is not enough space to grow up, then it will be sticky to bottom boundary.


// TODO provide css requirements and implementation guide. For now look at example folder.

// Requires of following layout
// A Node as Top Boundary ref 'top' or 'outer'
// A ParentWrapper [css:] position relative, width and height could be in percentage
//    > Sticky (Target) [css:] optional min-height
// A Node as Bottom Boundary ref 'bottom' (not needed if using outer)
*/
import { getClampArea, createStyle, setInlineStyle } from '../commons';

export const fillBetween = context => {
  const { stylesCache, boundaries } = context;
  const stickyBoundary = boundaries.get('sticky');
  const clampArea = getClampArea(boundaries);

  if (!stickyBoundary || !clampArea.height) {
    return;
  }
  const minHeight =
    stickyBoundary.params.minHeight ||
    stickyBoundary.element.getBoundingClientRect().height;

  const nextPosition = {
    maxHeight: clampArea.height,
  };
  if (clampArea.top === 0) {
    nextPosition.position = 'fixed';

    if (clampArea.height > minHeight) {
      nextPosition.top = 0;
    } else {
      nextPosition.maxHeight = minHeight;
      nextPosition.bottom = window.innerHeight - clampArea.bottom;
    }

    // Because the sticky element must follow parent width in case the parent has auto or a percentage width.
    nextPosition.width = stickyBoundary.element.parentElement.getBoundingClientRect().width;
  } else {
    nextPosition.position = 'absolute';
    nextPosition.top = 0;
  }

  const style = createStyle(nextPosition);
  setInlineStyle(stickyBoundary, style, stylesCache);
};
