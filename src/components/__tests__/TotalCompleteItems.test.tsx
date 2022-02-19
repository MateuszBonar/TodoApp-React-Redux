import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { TotalCompleteItems } from 'Components';
import i18n from 'i18next';

describe('TotalCompleteItems', () => {
  let store: any;
  const mockStore = configureMockStore([thunk]);

  beforeEach(() => {
    store = mockStore({
      todoModule: {
        isLoading: true,
        todos: [],
      },
    });
  });

  const getMounted = () =>
    mount(
      <Provider store={store}>
        <TotalCompleteItems />
      </Provider>
    );

  it('TotalCompleteItems is loading', () => {
    const component = getMounted();
    expect(component.find('p')).toHaveLength(1);
  });

  it('TotalCompleteItems is loading text', () => {
    const component = getMounted();
    expect(component.find('p').text()).toBe(i18n.t('inf_loading'));
  });

  it('TotalCompleteItems is visible', () => {
    const newStore = mockStore({
      todoModule: {
        isLoading: false,
        todos: [],
      },
    });
    const component = mount(
      <Provider store={newStore}>
        <TotalCompleteItems />
      </Provider>
    );

    expect(component.find('h4').text()).toBe(`${i18n.t('inf_total_items')} 0`);
  });
});
