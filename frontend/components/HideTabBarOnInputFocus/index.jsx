import PropTypes from 'prop-types';
import connect from './connect';
import focusListener from '../../helpers/focusListener';

/**
 * Hack for ios11 tabBar which is fixed to the bottom.
 * On Android when keyboard is open, the viewport sizing changes which makes elements fixed
 * to the bottom appear on top of the keyboard.
 * It looks and feels broken, therefore we need a global listener which would
 * hide fixed bottom elements when any input is focused.
 * @param {function} dispatch Dispatch function.
 * @return {JSX}
 */
const HideTabBarOnInputFocus = ({ dispatch }) => {
  focusListener(document, {
    dispatch,
  });

  return null;
};

HideTabBarOnInputFocus.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(HideTabBarOnInputFocus);
