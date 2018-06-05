import {
  SHOW_ADD_TO_CART_BAR,
  HIDE_ADD_TO_CART_BAR,
  SHOW_TAB_BAR,
  HIDE_TAB_BAR,
} from '../constants';

import {
  showAddToCartBar,
  hideAddToCartBar,
  showTabBar,
  hideTabBar,
} from './index';

describe('Actions', () => {
  describe('showAddToCartBar()', () => {
    it('should work as expected', () => {
      expect(showAddToCartBar()).toEqual({ type: SHOW_ADD_TO_CART_BAR });
    });
  });

  describe('hideAddToCartBar()', () => {
    it('should work as expected', () => {
      expect(hideAddToCartBar()).toEqual({ type: HIDE_ADD_TO_CART_BAR });
    });
  });

  describe('showTabBar()', () => {
    it('should work as expected', () => {
      const result = showTabBar();
      expect(result).toEqual({ type: SHOW_TAB_BAR });
    });
  });

  describe('hideTabBar()', () => {
    it('should work as expected', () => {
      const result = hideTabBar();
      expect(result).toEqual({ type: HIDE_TAB_BAR });
    });
  });
});
