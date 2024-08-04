import { createSlice } from '@reduxjs/toolkit';
import { newsExtraReducers } from './extraReducers';

const initialState = {
	articles: [],
	status: 'Inactivo',
	error: null,
};

export const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		clearNews(state) {
			state.news = null;
		},
	},
	extraReducers: newsExtraReducers,
});

export default newsSlice.reducer;
export const { clearNews } = newsSlice.actions;
