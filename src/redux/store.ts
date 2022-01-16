// import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';

// export default configureStore({
// 	reducer: {
// 		todosModule: todoReducer,
// 	},
// });
//

import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./rootReducer";

export default function configureStore(): Store {
	return createStore(rootReducer, applyMiddleware(thunk));
}
