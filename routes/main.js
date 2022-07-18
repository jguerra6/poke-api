import Route from './entities/index.js';

export default [
	new Route('/health', 'GET', [], (_req, res) => {
		res.status(200).json({ message: 'OK' });
	}),
];
