import { useEffect } from "react";
import { throttle } from "lodash-es";
import { useStickyContext } from "./sticky-context";

const manageListeners = (method, listeners, handler) =>
  listeners.forEach(l => window[method](l, handler));

export const useSticky = config => {
  const { context: id, onUpdate } = config;
  const stickyContext = useStickyContext(id);
  const updateSticky = throttle(onUpdate.bind(null, stickyContext), 10);

  useEffect(() => {
    updateSticky();
    manageListeners("addEventListener", ["scroll", "resize"], updateSticky);
    return () => {
      manageListeners(
        "removeEventListener",
        ["scroll", "resize"],
        updateSticky
      );
    };
  });

  return { registerAs: stickyContext.registerAs, stickyContext, updateSticky };
};
