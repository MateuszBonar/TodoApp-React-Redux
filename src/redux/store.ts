import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
  reducer: rootReducer,
});
