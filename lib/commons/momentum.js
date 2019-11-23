let prevPageYOffset = 0;
let prevPageHeight = 0;

/**
 * Helper to detect state of boundary affected by page position or resize.
 * When scrolling, if top of the page goes up, then isGoingDown becomes true.
 * When resizing to smaller height, then isGoingDown becomes true.
 * @param {Boundary} boundary
 * @returns {Momentum} { isIdle, isGoingDown, isGoingUp, distance }
 */
export const useMomentum = event => {
  let isIdle = true;
  let isGoingDown = false;
  let isGoingUp = false;
  let distance = 0;

  if (!prevPageYOffset) {
    prevPageYOffset = window.pageYOffset;
    prevPageHeight = window.innerHeight;
    return { isIdle, isGoingDown, isGoingUp, distance };
  }

  let prevState = prevPageYOffset;
  let currentState = window.pageYOffset;
  if (event && event.type === 'resize') {
    prevState = prevPageHeight;
    currentState = window.innerHeight;
  }

  isIdle = currentState === prevState;
  if (!isIdle) {
    isGoingUp = currentState < prevState;
    isGoingDown = !isGoingUp;
  }
  distance = prevState - currentState;

  prevPageYOffset = window.pageYOffset;
  prevPageHeight = window.innerHeight;
  return { isIdle, isGoingDown, isGoingUp, distance };
};
