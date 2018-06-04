import {
  SHOW_TAB_BAR,
  HIDE_TAB_BAR,
  SHOW_ADD_TO_CART_BAR,
  HIDE_ADD_TO_CART_BAR,
} from '../constants';

/**
 * Dispatches the SHOW_TAB_BAR action.
 * @return {Object}
 */
export const showTabBar = () => ({
  type: SHOW_TAB_BAR,
});

/**
 * Dispatches the HIDE_TAB_BAR action.
 * @return {Object}
 */
export const hideTabBar = () => ({
  type: HIDE_TAB_BAR,
});

/**
 * Dispatches the SHOW_ADD_TO_CART_BAR action.
 * @return {Object}
 */
export const showAddToCartBar = () => ({
  type: SHOW_ADD_TO_CART_BAR,
});

/**
 * Dispatches the HIDE_ADD_TO_CART_BUTTON action.
 * @return {Object}
 */
export const hideAddToCartBar = () => ({
  type: HIDE_ADD_TO_CART_BAR,
});
