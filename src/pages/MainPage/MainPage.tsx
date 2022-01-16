import React, { FC } from 'react';
import { AddTodoForm, TodoList, TotalCompleteItems } from 'Components';

const MainPage: FC = (): JSX.Element => {
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default MainPage;
