/*
  Minimal stub for assets/ui/ui.js, absent from this "essential edition" download of tasteskill
  (its README says the edition drops assets/ui fragments; it does not mention that layout.js and
  system.js still hold a static import of this file, which 404s the whole module on any page, tech
  or not). This page uses no UI fragment, object or shader ground (site-kind "other": a garage, not
  software/gaming/tech), so every call site in layout.js is already gated behind its own other()/
  phone()/reduced() checks and returns before calling into this module; system.js's own visuals()
  returns before importing it at all when the page holds no [data-fx], [data-ui], [data-ui-load] or
  [data-glow] element, which is the case here. This file exists only so the static import resolves;
  it is not part of the skill's kit and is never asked to do real work on this page.
*/
function loop(el, fn, opts = {}) {
  let stopped = false;
  const api = { wait: ms => new Promise(r => setTimeout(r, stopped ? 0 : ms)) };
  if (typeof fn === 'function') { try { fn(api); } catch { /* inert */ } }
  if (typeof opts.still === 'function') { try { opts.still(); } catch { /* inert */ } }
  return { pause() { stopped = true; }, resume() { stopped = false; } };
}
function start() { /* no UI fragment on this page */ }
function load() { /* no UI fragment on this page */ }
function grounds() { /* no shader ground on this page (site-kind other) */ }
function pausable() { /* no live context on this page */ }
function restart() { /* no fragment to restart */ }
export default { loop, start, load, grounds, pausable, restart };
