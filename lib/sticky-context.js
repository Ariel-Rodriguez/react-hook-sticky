import { createBoundary } from './boundary';

const StickyContexts = {};

// Common singleton factory
// TODO: Implement useContext from React.
export const useStickyContext = id => {
  if (StickyContexts[id]) {
    return StickyContexts[id];
  }

  StickyContexts[id] = {
    id,
    boundaries: {},
    createBoundary(namespace, params) {
      let name = namespace;
      return function boundaryRef(element) {
        if (!element) {
          return;
        }
        if (Array.isArray(namespace)) {
          [name] = namespace;
          const boundary = createBoundary(name, element, params);
          if (StickyContexts[id].boundaries[name]) {
            StickyContexts[id].boundaries[name].push(boundary);
            return;
          }
          StickyContexts[id].boundaries[name] = [boundary];
          return;
        }
        StickyContexts[id].boundaries[name] = createBoundary(
          name,
          element,
          params
        );
      };
    },
  };
  return StickyContexts[id];
};
