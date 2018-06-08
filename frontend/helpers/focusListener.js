import isIOSPlatform from './isiOSPlatform';
import {
  showTabBar,
  hideTabBar,
  showAddToCartBar,
  hideAddToCartBar,
} from '../actions';

let timeout;

/**
 * Checks if event relates to a keyboard show/hide events.
 * @param {MouseEvent} e Event.
 * @returns {boolean}
 */
function eventRelatesToAKeyboard(e) {
  return e.target.tagName === 'INPUT';
}
/**
 * Listener for `focusin` and `focusout` events which is showing/hiding all components
 * which could be visible in wrong places when keyboard is open.
 * @param {HtmlElement} document Html document
 * @param {function} dispatch Dispatch function.
 */
function focusListener(document, {
  dispatch,
}) {
  window.foo = {
    hideTabBar,
    hideAddToCartBar,
    dispatch,
    isIOSPlatform,
  };
  if (isIOSPlatform()) {
    console.warn('isIOSPlatform', true);
    return;
  }

  document.addEventListener('focusin', (e) => {
    console.warn('FOCUSIN');
    if (!eventRelatesToAKeyboard(e)) {
      console.warn('NOT KEYBOARD');
      return;
    }

    console.warn('CLEAR TIMEOUT');
    clearTimeout(timeout);
    dispatch(hideTabBar());
    console.warn('DID HIDE TABBAR');
    dispatch(hideAddToCartBar());
    console.warn('DID HIDE ADD TO CART');
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
