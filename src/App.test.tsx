//jest.clear all mocks zeby testy dobrze dzialaly jak cos zmieniasz

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MainPage } from './pages';

describe('App', () => {
  let store: any;
  const mockStore = configureMockStore([thunk]);

  jest.mock('i18next', () => ({
    init: () => {},
    t: (k: string) => k,
  }));

  jest.mock('react-redux', () => ({
    useSelector: jest.fn(passedFun => passedFun()),
  }));

  beforeEach(() => {
    store = mockStore({
      todoModule: {},
    });
  });

  const getWrapper = () =>
    shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );

  it('should render correctly', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(MainPage)).toBeTruthy();
  });
});
