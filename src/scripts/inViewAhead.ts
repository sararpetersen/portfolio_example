import { inView as motionInView } from "motion";

export const onReady = (callback: () => void): void => {
  // Astro's module scripts are deferred, so their page markup has already
  // been parsed. Running now avoids a visible frame before animation classes
  // are attached; waiting for DOMContentLoaded causes the text flash.
  callback();
};

/**
 * Content entrance animations are intentionally disabled. Keep this adapter
 * temporarily so page scripts do not mutate elements while the old calls are
 * removed incrementally.
 */
export const inView: typeof motionInView = () => () => {};
