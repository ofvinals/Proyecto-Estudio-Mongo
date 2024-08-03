import axios from 'axios';

export const apiURL = axios.create({
	baseURL: 'https://proyecto-estudio-mongo.onrender.com',
	// baseURL:'http://localhost:4000/'
});
