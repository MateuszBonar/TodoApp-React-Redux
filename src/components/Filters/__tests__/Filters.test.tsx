import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Filters } from 'Components';
import i18n from 'i18next';

describe('Filters', function () {
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
        <Filters />
      </Provider>
    );

  it('Filters have mounted div', () => {
    const component = getMounted();
    expect(component.find('.d-flex')).toHaveLength(1);
  });

  it('Filters have mounted div', () => {
    const component = getMounted();
    expect(component.find('.d-flex')).toHaveLength(1);
  });

  it('Filters renders 3 childrens when', () => {
    const component = getMounted();
    expect(component.find('div.btn-group').children()).toHaveLength(3);
  });
  //Error: Method “text” is meant to be run on 1 node. 0 found instead.
  it('Filters all button have right text', () => {
    const component = getMounted();
    expect(component.find('btn-primary').text()).toBe(i18n.t('inf_filter_all'));
  });
});
