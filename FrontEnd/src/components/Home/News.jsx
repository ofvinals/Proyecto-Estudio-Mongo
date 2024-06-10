import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { apiURL } from '../../../api/apiURL';
import Loader from '../Loader';

export const News = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadArticles = async () => {
			try {
				const response = await apiURL.get('/scrape');
				setArticles(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error al recopilar articulos', error);
			}
		};
		loadArticles();
	}, []);

	return (
		<div>
			<h2 className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-4xl font-bold text-center py-5'>
				Noticias Judiciales de Interés
			</h2>
			{loading ? (
				<Loader />
			) : (
				<Carousel className='h-[600px] mb-16 mx-6 sm:mx-24'>
					{articles.map((article, index) => (
						<Carousel.Item key={index}>
							<a
								href={article.link}
								target='_blank'
								rel='noopener noreferrer'>
								<img
									referrerPolicy='same-origin'
									className='rounded-xl object-cover w-full max-h-[400px] '
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
