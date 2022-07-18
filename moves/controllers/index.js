import MovesService from '../service/index.js';

export default class Moves {
	constructor(dependencies) {
		this.movesService = new MovesService(dependencies);
		this.writeJson = dependencies.writeJson;
		this.errorHandler = dependencies.HTTPErrorHandler;
	}

	getCommonMoves = (req, res, next) => {
		// Get all the paramaters and set their defaults if not passed
		let pokemons = req.query.pokemons;
		let lang = req.query.lang || 'en';
		let limit = req.query.limit || 100;

		// Allow a different way to send the parameters on the query string
		if (typeof pokemons === 'string') {
			pokemons = pokemons.split(',');
		}

		// Check if at least 2 pokemons were sent, otherwise send an error message.
		if (pokemons.length < 2) {
			throw new this.errorHandler({
				statusCode: 400,
				description: 'Please enter at least 2 pokemons.',
			});
		}

		// Invoke the moves service, if succesful return the results. Otherwise handle the error.
		this.movesService
			.compare({ pokemons, lang, limit })
			.then((response) => {
				this.writeJson(res, response);
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	};
}
