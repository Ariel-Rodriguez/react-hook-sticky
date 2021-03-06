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

const ensureKebabCase = key => key.replace(/([A-Z])/g, '-$1').toLowerCase();

export const createStyle = props =>
  Object.keys(props).reduce((styles, key) => {
    const propName = ensureKebabCase(key);
    const propValue = ensureTrailingPx(propName, props[key]);

    return `${styles}${propName}:${propValue};`;
  }, '');

export const setInlineStyle = (boundary, style, cache) => {
  if (!cache || cache.get(boundary.name) !== style) {
    requestAnimationFrame(function onBeforePaint() {
      boundary.element.setAttribute('style', style);
    });
    cache.set(boundary.name, style);
  }
};
