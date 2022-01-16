import React, { FC, FormEvent, useState } from 'react';

import { useDispatchedActions } from 'Hooks';
import { todoActions } from 'Redux/todo/todoSlice';

const AddTodoForm: FC = (): JSX.Element => {
  const [value, setValue] = useState<string>('');

  const { addTodoAsync } = useDispatchedActions({
    addTodoAsync: todoActions.addTodoAsync,
  });

  const handleValue = (event: { target: HTMLInputElement }): void => {
    setValue(event.target.value);
  };

  const onSubmit = (event: FormEvent): void => {
    event.preventDefault();
    value &&
      addTodoAsync({
        title: value,
      });
  };

  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <label className="sr-only">Name</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        onChange={handleValue}
      />
      <button type="submit" className="btn btn-primary mb-2">
        Submit
      </button>
    </form>
  );
};

export default AddTodoForm;
