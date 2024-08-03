import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/slice';
import authReducer from './auth/slice';
import exptesReducer from './exptes/slice';
import turnsReducer from './turns/slice';
import billsReducer from './bills/slice';
import cajasReducer from './cashs/slice';
import toastReducer from './toast/slice';
import notesReducer from './notes/slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: usersReducer,
		exptes: exptesReducer,
		turns: turnsReducer,
		bills: billsReducer,
		cashs: cajasReducer,
		toast: toastReducer,
		notes: notesReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
