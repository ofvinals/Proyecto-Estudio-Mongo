import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/slice';
import authReducer from './auth/slice';
import exptesReducer from './exptes/slice';
import eventsReducer from './events/slice';
import billsReducer from './bills/slice';
import cajasReducer from './cashs/slice';
import toastReducer from './toast/slice';
import notesReducer from './notes/slice';
import newsReducer from './news/slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: usersReducer,
		exptes: exptesReducer,
		movs: exptesReducer,
		events: eventsReducer,
		bills: billsReducer,
		cashs: cajasReducer,
		toast: toastReducer,
		notes: notesReducer,
		news: newsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});
