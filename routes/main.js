import Route from './entities/index.js';

export default [
	new Route('/', 'GET', [], (_req, res) => {
		res.status(200).json({
			message:
				'Go to https://jguerra6.github.io/poke-api to check the valid endpoints',
		});
	}),
	new Route('/health', 'GET', [], (_req, res) => {
		res.status(200).json({ message: 'OK' });
	}),
];
