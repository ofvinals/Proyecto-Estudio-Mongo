/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import { useNewsActions } from '../../hooks/useNews.js';
import Loader from '../../utils/Loader.jsx';

export const News = () => {
	const articles = useSelector((state) => state.news.articles);
	const status = useSelector((state) => state.news.status);
	const error = useSelector((state) => state.news.error);
	const { getNews } = useNewsActions();

	useEffect(() => {
		getNews();
	}, []);

	return (
		<div>
			<h2 className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-4xl font-bold text-center py-5'>
				Noticias Judiciales de Interés
			</h2>

			{status === 'Cargando' ? (
				<Loader />
			) : status === 'Fallido' ? (
				<p>Error: {error}</p>
			) : (
				<Carousel className='h-[600px] md:h-[550px] mb-16 mx-6 sm:mx-24'>
					{articles.map((article, index) => (
						<Carousel.Item key={index}>
							<a
								href={article.link}
								target='_blank'
								rel='noopener noreferrer'>
								<img
									referrerPolicy='same-origin'
									className='rounded-xl object-cover w-full max-h-[400px]'
									src={article.imgSrc}
									alt={article.title}
								/>
								<h3 className='text-background text-3xl font-bold text-center py-3'>
									{article.title}
								</h3>
							</a>
							<div>
								<p className='text-background text-center sm:mx-10 overflow-hidden overflow-ellipsis'>
									{article.description}
								</p>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			)}
		</div>
	);
};
