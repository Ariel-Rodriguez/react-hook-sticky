export const fixBetween = (sticky, boundaryTop, boundaryBottom) => {
  if (sticky.top < boundaryTop.bottom) {
    return {
      top: boundaryTop.bottom + 1,
      bottom: boundaryTop.bottom + sticky.height,
      position: 'absolute',
    };
  }

  if (sticky.bottom > boundaryBottom.top) {
    return {
      top: boundaryBottom.top - sticky.height,
      bottom: boundaryBottom.top - 1,
      position: 'absolute',
    };
  }

  return {
    top: sticky.top,
    bottom: sticky.top + sticky.height,
    position: 'fixed',
  };
};
