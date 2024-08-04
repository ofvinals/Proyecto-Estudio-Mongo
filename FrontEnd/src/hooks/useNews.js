import { useAppDispatch, useAppSelector } from './store';
import { fetchArticles } from '../store/news/thunks';
import { clearNews } from '../store/news/slice';

export function useNewsActions() {
	const articles = useAppSelector((state) => state.news.articles);
	const status = useAppSelector((state) => state.news.status);
	const error = useAppSelector((state) => state.news.error);

	const dispatch = useAppDispatch();

	const getNews = async () => {
		await dispatch(fetchArticles());
	}

	const clearNews = () => {
		dispatch(clearNews());
	};

	return {
		articles,
		status,
		error,
		getNews,
		clearNews,
	};
}
