import { rootReducer } from './rootReducer';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { RootState } from 'Redux/types';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
