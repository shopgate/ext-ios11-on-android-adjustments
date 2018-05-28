import React from 'react';
import PropTypes from 'prop-types';
import { Theme } from '@shopgate/pwa-common/context';
import connect from './connect';
import focusListener from '../../helpers/focusListener';

/**
 * Hack for ios11 tabBar which is fixed to the bottom.
 * On Android when keyboard is open, the viewport sizing changes which makes elements fixed
 * to the bottom appear on top of the keyboard.
 * It looks and feels broken, therefore we need a global listener which would
 * hide the tabBar when any input is focused.
 * @param {function} dispatch Dispatch function.
 * @return {JSX}
 */
const HideTabBarOnInputFocus = ({ dispatch }) => (
  <Theme>
    {
      (theme) => {
        focusListener(document, {
          dispatch,
          ...theme.actions,
        });
        return null;
      }
    }
  </Theme>
);

HideTabBarOnInputFocus.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(HideTabBarOnInputFocus);
