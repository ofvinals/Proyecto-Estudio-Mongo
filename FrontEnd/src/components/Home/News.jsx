import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../Loader';

export const News = () => {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await axios.get(
					'https://proyecto-estudio-mongo.onrender.com/scrape'
				);
				setArticles(response.data);
			} catch (error) {
				console.error('Error fetching articles', error);
			}
		};
		fetchArticles();
	}, []);
	// useEffect(() => {
	// 	const loadData = async () => {
	// 		try {
	// 			const url = `https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=${apiKey}`;
	// 			const response = await fetch(url);
	// 			const data = await response.json();
	// 			console.log(data);
	// 			setNews(data.articles);
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error);
	// 		}
	// 	};

	// 	loadData();
	// }, []);

	return (
		<div>
			<h2 className='bg-gradient-to-t from-primary to-blue-200 text-transparent bg-clip-text text-4xl font-bold text-center py-5'>
				Noticias Judiciales de Interés
			</h2>

			{articles ? (
				<Carousel className='h-[570px] mb-12 mx-6 sm:mx-24'>
					{articles.map((article, index) => (
						<Carousel.Item key={index}>
							{console.log(article)}
							<a
								href={article.link}
								target='_blank'
								rel='noopener noreferrer'>
								<img referrerPolicy='same-origin' className='rounded-xl object-cover w-full' src={article.imgSrc} alt={article.title} />
								<h3 className='text-background text-3xl font-bold text-center py-3'>
									{article.title}
								</h3>
							</a>
							<div>
								<p className='text-background text-md text-center sm:mx-10'>
									{article.description}
								</p>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			) : (
				<Loader />
			)}
		</div>
	);
};
