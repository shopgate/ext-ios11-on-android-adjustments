import focusListener from './index';

const document = {
  addEventListener: jest.fn(),
};
const params = {
  dispatch: jest.fn(),
  hideTabBar: jest.fn(),
  hideAddToCartBar: jest.fn(),
  showTabBar: jest.fn(),
  showAddToCartBar: jest.fn(),
};

describe('focusListener', () => {
  const testModes = (mode = 'all') => {
    switch (mode) {
      case 'hide':
        expect(params.hideTabBar).toBeCalled();
        expect(params.hideAddToCartBar).toBeCalled();
        expect(params.showTabBar).not.toBeCalled();
        expect(params.showAddToCartBar).not.toBeCalled();
        break;
      case 'show':
        expect(params.hideTabBar).not.toBeCalled();
        expect(params.hideAddToCartBar).not.toBeCalled();
        expect(params.showTabBar).toBeCalled();
        expect(params.showAddToCartBar).toBeCalled();
        break;
      default:
        expect(params.hideTabBar).not.toBeCalled();
        expect(params.hideAddToCartBar).not.toBeCalled();
        expect(params.showTabBar).not.toBeCalled();
        expect(params.showAddToCartBar).not.toBeCalled();
    }
    params.hideTabBar.mockClear();
    params.hideAddToCartBar.mockClear();
    params.showTabBar.mockClear();
    params.showAddToCartBar.mockClear();
  };
  it('should subscribe to all events', () => {
    focusListener(document, params);
    expect(document.addEventListener.mock.calls[0][0]).toBe('focusin');
    expect(document.addEventListener.mock.calls[1][0]).toBe('focusout');
    testModes();
    document.addEventListener.mock.calls[0][1]();
    testModes('hide');
    document.addEventListener.mock.calls[1][1]();
    testModes('show');
  });
});