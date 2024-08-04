import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showToast } from '../toast/slice';

export const fetchArticles = createAsyncThunk(
	'news/fetchArticles',
	async (_, { dispatch }) => {
		try {
			const response = await axios.get(
				'https://proyecto-estudio-mongo.onrender.com/scrape'
			);
			return response.data;
		} catch (error) {
			dispatch(
				showToast({
					type: 'error',
					message: 'Error al obtener noticias',
				})
			);
			console.error(error);
			throw error;
		}
	}
);
