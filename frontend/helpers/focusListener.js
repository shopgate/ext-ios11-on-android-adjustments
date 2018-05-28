import isIOSPlatform from './isiOSPlatform';

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
 * @param {function} hideTabBar HideTabBar function.
 * @param {function} hideAddToCartBar HideAddToCartBar function.
 * @param {function} showTabBar ShowTabBar function.
 * @param {function} showAddToCartBar ShowAddToCartBar function.
 */
function focusListener(document, {
  dispatch,
  hideTabBar,
  hideAddToCartBar,
  showTabBar,
  showAddToCartBar,
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
    timeout = setTimeout(() => {
      dispatch(showTabBar());
      dispatch(showAddToCartBar());
    }, 600);
  });
}

export default focusListener;
