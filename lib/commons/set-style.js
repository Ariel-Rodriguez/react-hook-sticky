const REQUIRES_TRAILING_PX = [
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height',
  'max-height',
  'min-height',
  'min-width',
  'max-width',
];

const ensureTrailingPx = (key, value) =>
  key.indexOf('px') === -1 && REQUIRES_TRAILING_PX.includes(key)
    ? `${value}px`
    : value;

export const setStyle = (element, props) => {
  element.setAttribute(
    'style',
    Object.keys(props).reduce(
      (acc, key) => `${acc}${key}:${ensureTrailingPx(key, props[key])};`,
      ''
    )
  );
};
