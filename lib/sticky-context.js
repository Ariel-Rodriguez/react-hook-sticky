import { createBoundary } from './boundary';

const StickyContexts = new Map();

const createContext = id => ({
  id,
  stylesCache: new Map(),
  boundaries: new Map(),
  createBoundary(name, params) {
    return function onRef(element) {
      const { boundaries } = StickyContexts.get(id);
      if (!element) {
        boundaries.delete(name);
        return;
      }

      boundaries.set(name, createBoundary(name, element, params));
    };
  },
  flushCache() {
    this.stylesCache.clear();
  },
});

export const useStickyContext = id => {
  if (StickyContexts.has(id)) {
    return StickyContexts.get(id);
  }
  const context = createContext(id);
  StickyContexts.set(id, context);
  return context;
};
