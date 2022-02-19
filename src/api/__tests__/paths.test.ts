import { TODO } from 'Api';

describe('check apis urls', () => {
  const MODULE_URL = 'http://localhost:7000/todos';
  const id: string = '1';

  test('GET_ALL', () => {
    expect(TODO.GET_ALL).toEqual(MODULE_URL);
  });

  test('ADD_TODO', () => {
    expect(TODO.ADD_TODO).toEqual(MODULE_URL);
  });

  test('TOGGLE_COMPLETE_TODO', () => {
    expect(TODO.TOGGLE_COMPLETE_TODO(id)).toEqual(`${MODULE_URL}/1`);
  });

  test('DELETE_TODO', () => {
    expect(TODO.DELETE_TODO(id)).toEqual(`${MODULE_URL}/1`);
  });
});
