import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

export const News = () => {
	const [news, setNews] = useState(null);
	const apiKey = 'fc0b87f78d6f4b45b5644bb80b89e20d';

	useEffect(() => {
		const loadData = async () => {
			try {
				const url = `https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=${apiKey}`;
				const response = await fetch(url);
				const data = await response.json();
				console.log(data);
				setNews(data.articles);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		loadData();
	}, []);

	return (
		<div>
			<h2 className='text-primary text-3xl font-bold text-center py-5'>
				Noticias de Interés
			</h2>
			{news ? (
				<Carousel className='h-[370px] mx-6 sm:mx-24'>
					{news.map((article, index) => (
						<Carousel.Item key={index}>
							<a
								href={article.url}
								target='_blank'
								rel='noopener noreferrer'>
								<img
									className='block w-100'
									src={article.urlToImage}
									// alt={article.title}
								/>
								<div>
									<h3 className='text-background text-3xl text-center py-5'>
										{article.title}
									</h3>
									<p className='text-background text-3xl text-center sm:mx-10'>
										{article.description}
									</p>
								</div>
							</a>
						</Carousel.Item>
					))}
				</Carousel>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
