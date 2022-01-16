import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { getFinishedTodos, getIsLoading } from 'Redux/todo';

const TotalCompleteItems: FC = (): JSX.Element => {
  const finishedTodos = useSelector(getFinishedTodos);
  const isLoading = useSelector(getIsLoading);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <h4 className="mt-3">Total complete items: {finishedTodos?.length}</h4>
  );
};

export default TotalCompleteItems;
