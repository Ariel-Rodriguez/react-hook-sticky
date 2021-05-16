import { useEffect } from 'react';
import { useStickyContext } from './sticky-context';

const manageListeners = (method, listeners, handler, options) =>
  listeners.forEach(l => window[method](l, handler, options));

const defaultEventListenerOptions = { passive: true };

export const useSticky = (config, dependency = []) => {
  const {
    context: id,
    plugin,
    eventListenerOptions = defaultEventListenerOptions,
  } = config;
  const stickyContext = useStickyContext(id);
  const runPlugin = plugin.bind(null, stickyContext);

  stickyContext.flushCache();

  useEffect(() => {
    runPlugin();
    manageListeners(
      'addEventListener',
      ['scroll', 'resize'],
      runPlugin,
      eventListenerOptions
    );
    return () => {
      manageListeners(
        'removeEventListener',
        ['scroll', 'resize'],
        runPlugin,
        eventListenerOptions
      );
    };
  }, dependency);

  return {
    createBoundary: stickyContext.createBoundary,
    stickyContext,
    runPlugin,
  };
};
