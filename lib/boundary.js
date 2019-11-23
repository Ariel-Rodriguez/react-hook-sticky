export const createBoundary = (name, element, params = {}) => {
  const computedStyles = params.computeStyles
    ? window.getComputedStyle(element)
    : null;
  return { name, element, params, computedStyles };
};
