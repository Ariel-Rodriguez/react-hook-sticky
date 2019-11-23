import { createBoundary } from './sticky-boundary';

const StickyContexts = {};

// Common singleton factory
// TODO: Implement useContext from React.
export const useStickyContext = id => {
  if (StickyContexts[id]) {
    return StickyContexts[id];
  }

  StickyContexts[id] = {
    boundaries: {},
    createBoundary(namespace, params) {
      return function boundaryRef(element) {
        if (Array.isArray(namespace)) {
          const [name] = namespace;
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
