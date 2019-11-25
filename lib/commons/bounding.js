export const mapBoundariesToRect = boundaries => {
  return Object.keys(boundaries).reduce((acc, boundary) => {
    const { name, element } = boundaries[boundary];
    if (!name) return acc;
    return {
      ...acc,
      [name]: element ? element.getBoundingClientRect() : null,
    };
  }, {});
};

export const getClampArea = boundaries => {
  const { top, bottom, outer } = mapBoundariesToRect(boundaries);
  // top and bottom are mandatory only if outer is not provided.
  if (!outer && (!top || !bottom)) {
    return {};
  }

  const maxTop = outer ? outer.top : top.bottom;
  const maxBottom = outer ? outer.bottom : bottom.top;
  const topClamp = maxTop > 0 ? maxTop : 0;
  const bottomClamp =
    maxBottom < window.innerHeight ? maxBottom : window.innerHeight;
  const clampArea = bottomClamp - topClamp;
  return { top: topClamp, bottom: bottomClamp, height: clampArea };
};
