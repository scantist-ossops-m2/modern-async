import assert from 'assert'

/**
 * Wraps a function call that may be synchronous in a function that
 * is guaranted to be async. This is a stricter version of calling a
 * function and wrapping its result using Promise.resolve() as the new function also
 * handles the case where the original function throws an exception.
 *
 * @param {Function} fct The function to wrap.
 * @returns {Function} The wrapped function.
 */
function asyncWrap (fct) {
  assert(typeof fct === 'function', 'fct must be a function')
  return async function () {
    return fct(...arguments)
  }
}

export default asyncWrap
