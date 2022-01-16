import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { getFinishedTodos } from 'Redux/todo';

const TotalCompleteItems: FC = (): JSX.Element => {
  const finishedTodos = useSelector(getFinishedTodos);

  return <h4 className="mt-3">Total complete items: {finishedTodos?.length}</h4>;
};

export default TotalCompleteItems;
