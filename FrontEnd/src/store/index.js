import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/slice';
import authReducer from './auth/slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
	},
});
