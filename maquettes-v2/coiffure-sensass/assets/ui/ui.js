// Minimal shim: the "essential edition" of the design-taste-frontend skill ships assets/ui/base.css
// and assets/ui/cards.css only, but assets/layout/layout.js and assets/system.js both import
// assets/ui/ui.js unconditionally (it normally drives UI fragments: chat panels, loops, pause
// buttons). This page uses none of those (no [data-ui], [data-ui-load], [data-fx] or [data-glow]
// elements, and no hero word/collage/steps moments), so system.js's guard returns before ever
// calling into this module, and layout.js's calls to ui.loop() only happen inside feature
// functions (liveWord, collage, steps) that this page never triggers. This file exists solely so
// the two modules that import it resolve, with no behaviour of its own.
export default {
  loop(el) { return { stop() {}, restart() {} }; },
  load(el) { return Promise.resolve(); },
  start(el) { return Promise.resolve(); },
};
