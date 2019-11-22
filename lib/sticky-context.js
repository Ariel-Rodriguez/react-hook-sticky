const StickyContexts = {};

// Common singleton factory
// TODO: Implement useContext from React.
export const useStickyContext = id => {
  if (StickyContexts[id]) {
    return StickyContexts[id];
  }

  StickyContexts[id] = {
    registerAs(name) {
      return function(element) {
        StickyContexts[id][name] = element;
      };
    },
  };
  return StickyContexts[id];
};
