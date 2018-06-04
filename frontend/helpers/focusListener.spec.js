import {
  showAddToCartBar,
  hideAddToCartBar,
  showTabBar,
  hideTabBar,
} from '../actions';

import focusListener from './focusListener';

let mockedIsIOSPlatform = false;
jest.useFakeTimers();
jest.mock('./isiOSPlatform', () => () => mockedIsIOSPlatform);

const document = {
  addEventListener: jest.fn(),
};

describe('focusListener()', () => {
  const dispatch = jest.fn();

  // eslint-disable-next-line require-jsdoc
  const testActions = (mode = 'all') => {
    jest.runAllTimers();

    switch (mode) {
      case 'hide':
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(hideTabBar());
        expect(dispatch).toHaveBeenCalledWith(hideAddToCartBar());
        break;
      case 'show':
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith(showTabBar());
        expect(dispatch).toHaveBeenCalledWith(showAddToCartBar());
        break;
      default:
        expect(dispatch).toHaveBeenCalledTimes(0);
    }

    dispatch.mockClear();
  };

  beforeEach(() => {
    document.addEventListener.mockClear();
  });

  it('should subscribe to all events', () => {
    focusListener(document, { dispatch });

    const [[, focusin], [, focusout]] = document.addEventListener.mock.calls;

    expect(document.addEventListener).toHaveBeenCalledTimes(2);
    expect(document.addEventListener).toHaveBeenCalledWith('focusin', expect.any(Function));
    expect(document.addEventListener).toHaveBeenCalledWith('focusout', expect.any(Function));

    testActions();

    focusin({ target: { tagName: 'INPUT' } });
    testActions('hide');

    focusout({ target: { tagName: 'INPUT' } });
    testActions('show');
  });

  it('should do nothing when focus element is not an input', () => {
    focusListener(document, { dispatch });
    const [[, focusin], [, focusout]] = document.addEventListener.mock.calls;

    focusin({ target: { tagName: 'BUTTON' } });
    testActions();

    focusout({ target: { tagName: 'BUTTON' } });
    testActions();
  });

  it('should do nothing on ios theme', () => {
    mockedIsIOSPlatform = true;
    focusListener(document, { dispatch });

    expect(document.addEventListener).not.toHaveBeenCalled();
    testActions();
  });
});
