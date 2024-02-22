import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
	try {
		const  {token }= req.cookies;

		if (!token)
			return res.status(401).json(['No token, authorization denied']);

		jwt.verify(token, TOKEN_SECRET, (error, user) => {
			if (error) {
				return res.status(401).json(['Token is not valid']);
			}
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
