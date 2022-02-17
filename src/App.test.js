import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

describe('App', () => {
  let store;

  const mockStore = configureMockStore([thunk]);

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

  // const middlewares = [];
  // const mockStore = configureStore(middlewares);
  //
  //
  // it('should render correctly', () => {
  //   const component = mount(
  //     <Provider store={store}>
  //       <NotificationsTable />
  //     </Provider>
  //   );
});
