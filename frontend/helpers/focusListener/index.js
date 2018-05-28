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
  document.addEventListener('focusin', () => {
    dispatch(hideTabBar());
    dispatch(hideAddToCartBar());
  });
  document.addEventListener('focusout', () => {
    dispatch(showTabBar());
    dispatch(showAddToCartBar());
  });
}

export default focusListener;
