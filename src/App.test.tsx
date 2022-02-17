import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

describe('App', () => {
  let store: any;

  const mockStore = configureMockStore([thunk]);

  jest.mock('i18next', () => ({
    init: () => {},
    t: (k: string) => k,
  }));

  beforeEach(() => {
    store = mockStore({
      todoModule: {},
    });
  });

  it('should render correctly', () => {
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
