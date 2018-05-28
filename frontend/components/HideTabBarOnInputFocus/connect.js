import { connect } from 'react-redux';

/**
 * Maps dispatch to props.
 * @param {function} dispatch Dispatch.
 * @return {Object}
 */
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(null, mapDispatchToProps);
