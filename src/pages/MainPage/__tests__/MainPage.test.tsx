import React from 'react';
import { shallow } from 'enzyme';
import MainPage from '../MainPage';
import i18n from 'i18next';

describe('MainPage', () => {
  test('should render correctly', () => {
    shallow(<MainPage />);
  });

  test('render h1 with translations', () => {
    const wrapper = shallow(<MainPage />);
    expect(wrapper.find('h1').text()).toBe(i18n.t('inf_title'));
  });
});
