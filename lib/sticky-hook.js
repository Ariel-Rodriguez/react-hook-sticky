import { useEffect } from 'react';
import { useStickyContext } from './sticky-context';

const manageListeners = (method, listeners, handler) =>
  listeners.forEach(l => window[method](l, handler));

export const useSticky = config => {
  const { context: id, plugin } = config;
  const stickyContext = useStickyContext(id);
  const runPlugin = plugin.bind(null, stickyContext);

  stickyContext.flushCache();

  useEffect(() => {
    runPlugin();
    manageListeners('addEventListener', ['scroll', 'resize'], runPlugin);
    return () => {
      manageListeners('removeEventListener', ['scroll', 'resize'], runPlugin);
    };
  }, []);

  runPlugin();

  return {
    createBoundary: stickyContext.createBoundary,
    stickyContext,
    runPlugin,
  };
};
