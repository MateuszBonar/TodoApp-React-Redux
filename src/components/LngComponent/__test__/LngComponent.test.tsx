import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { LngComponent } from 'Components';

describe('LngComponent', () => {
  let store: any;
  const mockStore = configureMockStore([thunk]);

  beforeEach(() => {
    store = mockStore({
      todoModule: {},
    });
  });

  const getMounted = () =>
    mount(
      <Provider store={store}>
        <LngComponent />
      </Provider>
    );

  it('LngComponent includes main div', () => {
    const component = getMounted();
    expect(component.find('.input-group')).toHaveLength(1);
  });
});
