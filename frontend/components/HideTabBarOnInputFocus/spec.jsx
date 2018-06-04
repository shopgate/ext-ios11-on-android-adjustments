import React from 'react';
import { mount } from 'enzyme';
import HideTabBarOnInputFocus from './index';

const mockedDispatch = jest.fn();
const mockedFocusListener = jest.fn();

jest.mock('../../helpers/focusListener', () => (...args) => mockedFocusListener(...args));
jest.mock('react-redux', () => ({
  connect: (stateToProps, dispatchToProps) => Component => () => (
    <Component {...dispatchToProps(mockedDispatch)} />
  ),
}));

describe('HideTabBarOnInputFocus', () => {
  let component;

  it('should render null and call focusListener with appropriate arguments', () => {
    component = mount(<HideTabBarOnInputFocus />);
    expect(component.html()).toBe(null);

    const [call] = mockedFocusListener.mock.calls;
    expect(typeof call[0].location).toBe('object');
    const requiredFunctions = [
      'dispatch',
    ];

    requiredFunctions.forEach((func) => {
      expect(typeof call[1][func]).toBe('function');
    });
  });
});
