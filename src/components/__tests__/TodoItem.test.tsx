import React from 'react';
import { shallow, mount } from 'enzyme';
import ToDoItem from 'Components/TodoItem';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import i18n from 'i18next';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn().mockImplementation(x => x),
    i18n: {},
  }),
}));

describe('ToDoItem', () => {
  let store: any;
  const props = { id: '1', title: 'Test', completed: true };
  const mockStore = configureMockStore([thunk]);

  jest.mock('Hooks', () => ({
    useDispatchedActions: jest.fn(() => ({
      deleteTodoAsync: jest.fn(),
      toggleCompleteAsync: jest.fn(),
    })),
  }));

  const getMounted = () =>
    mount(
      <Provider store={store}>
        <ToDoItem {...props} />
      </Provider>
    );

  beforeEach(() => {
    store = mockStore({
      todoModule: {},
    });
  });

  it('TodoItem includes a li', () => {
    const component = getMounted();
    expect(component.find('li')).toBeTruthy();
  });

  it('should TodoItem includes type checkbox', () => {
    const wrapper = getMounted();
    expect(wrapper.find('input').prop('type')).toEqual('checkbox');
  });

  it('should TodoItem checkbox is completed', () => {
    const wrapper = getMounted();
    expect(wrapper.find('input').prop('checked')).toEqual(true);
  });

  it('should TodoItem checkbox is completed className', () => {
    const wrapper = getMounted();
    expect(wrapper.find('li').prop('className')).toEqual('list-group-item list-group-item-success');
  });

  it('should TodoItem includes span className', () => {
    const wrapper = getMounted();
    expect(wrapper.find('span').prop('className')).toEqual('d-flex align-items-center');
  });

  it('should TodoItem includes div className', () => {
    const wrapper = getMounted();
    expect(wrapper.find('div').prop('className')).toEqual('d-flex justify-content-between');
  });

  it('should TodoItem includes div button', () => {
    const wrapper = getMounted();
    expect(wrapper.find('button')).toBeTruthy();
  });

  it('should TodoItem includes div button text', () => {
    const wrapper = getMounted();
    expect(wrapper.find('button').text()).toContain('btn_delete');
  });

  it('should onClick work', () => {
    const wrapper = getMounted();
    const mockCallBack = jest.fn();
    wrapper.find('button').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(0); // DO POPRAWKI
  });
});
