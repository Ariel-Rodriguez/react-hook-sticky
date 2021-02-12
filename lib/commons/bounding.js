export const mapBoundariesToRect = boundaries => {
  const boundariesRect = {};
  boundaries.forEach(value => {
    const { name, element } = value;
    if (name) {
      boundariesRect[name] = element ? element.getBoundingClientRect() : null;
    }
  });
  return boundariesRect;
};

export const getClampArea = boundaries => {
  const { top, bottom, outer } = mapBoundariesToRect(boundaries);
  // top and bottom are mandatory only if outer is not provided.
  if (!outer && (!top || !bottom)) {
    console.log('Fail to initialize react-hook-sticky. Boundaries not found.');
    return {};
  }
  const offsets = { top: 0, bottom: 0 };
  if (!outer) {
    offsets.top = top.height;
    offsets.bottom = bottom.height;
  }

  const maxTop = outer ? outer.top : top.bottom;
  const maxBottom = outer ? outer.bottom : bottom.top;
  const topClamp = maxTop > 0 ? maxTop : 0;
  const bottomClamp =
    maxBottom < window.innerHeight ? maxBottom : window.innerHeight;
  const clampArea = bottomClamp - topClamp;

  return { top: topClamp, bottom: bottomClamp, height: clampArea, offsets };
};
