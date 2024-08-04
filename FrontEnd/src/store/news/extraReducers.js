import { fetchArticles } from './thunks';

export const newsExtraReducers = (builder) => {
	builder
		.addCase(fetchArticles.pending, (state) => {
			state.status = 'Cargando';
		})
		.addCase(fetchArticles.fulfilled, (state, action) => {
			state.status = 'Exitoso';
			state.articles = action.payload;
		})
		.addCase(fetchArticles.rejected, (state, action) => {
			state.status = 'Fallido';
			state.error = action.error.message;
		});
};
