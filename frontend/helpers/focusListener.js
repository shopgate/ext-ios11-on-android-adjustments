import isIOSPlatform from './isiOSPlatform';
import {
  showTabBar,
  hideTabBar,
  showAddToCartBar,
  hideAddToCartBar,
} from '../actions';

let timeout;

/* eslint-disable func-names */

/**
 * Polyfill for el.closest() function to find parent elements by selector
 * https://developer.mozilla.org/en-US/docs/web/api/element/closest#polyfill
 */
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    let el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

/* eslint-enable */

/**
 * Checks if event relates to a keyboard show/hide events.
 * @param {MouseEvent} e Event.
 * @returns {boolean}
 */
function eventRelatesToAKeyboard(e) {
  const fromInput = e.target.tagName === 'INPUT';

  if (!fromInput) {
    return false;
  }

  let fromTabBar = false;

  try {
    // Check if input was inside of the add-to-cart-bar - don't hide bars
    fromTabBar = e.target.closest('.theme__product__add-to-cart-bar');
  } catch (err) {
    // nothing to do here
  }

  return !fromTabBar;
}

/**
 * Listener for `focusin` and `focusout` events which is showing/hiding all components
 * which could be visible in wrong places when keyboard is open.
 * @param {HtmlElement} document Html document
 * @param {Function} dispatch Dispatch function.
 */
function focusListener(document, {
  dispatch,
}) {
  if (isIOSPlatform()) {
    return;
  }

  document.addEventListener('focusin', (e) => {
    if (!eventRelatesToAKeyboard(e)) {
      return;
    }

    clearTimeout(timeout);
    dispatch(hideTabBar());
    dispatch(hideAddToCartBar());
  });

  document.addEventListener('focusout', (e) => {
    if (!eventRelatesToAKeyboard(e)) {
      return;
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      dispatch(showTabBar());
      dispatch(showAddToCartBar());
    }, 600);
  });
}

export default focusListener;
