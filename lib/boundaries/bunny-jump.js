import {
  useMomentum,
  getClampArea,
  createStyle,
  setInlineStyle,
} from '../commons';

// Explode your creativity, create your new module sticky to later being integrated
export const bunnyJump = (context, event) => {
  const { id: cacheKey, boundaries } = context;
  const stickyBoundary = boundaries.sticky;
  const clampArea = getClampArea(boundaries);

  if (!stickyBoundary || !clampArea.height) {
    return;
  }

  const nextPosition = {
    position: 'absolute',
    maxHeight: clampArea.height,
  };
  const { isGoingDown } = useMomentum(event);

  if (isGoingDown) {
    nextPosition.top = 0;
  } else {
    nextPosition.bottom = 0;
  }

  setInlineStyle(stickyBoundary, createStyle(nextPosition), cacheKey);
};
