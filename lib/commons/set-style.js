const PROPERTYS_WITH_TRAILING_PX = [
  'top',
  'bottom',
  'left',
  'right',
  'width',
  'height',
];

const ensureTrailingPx = (key, value) =>
  PROPERTYS_WITH_TRAILING_PX.includes(key) ? `${value}px` : value;

export const setStyle = (element, props) => {
  element.setAttribute(
    'style',
    Object.keys(props).reduce(
      (acc, key) => `${acc}${ensureTrailingPx(key, props[key])};`,
      ''
    )
  );
};
