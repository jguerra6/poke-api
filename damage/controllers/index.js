import DamageService from '../service/index.js';

export default class Damage {
	constructor(dependencies) {
		this.damageService = new DamageService(dependencies);
		this.writeJson = dependencies.writeJson;
		this.errorHandler = dependencies.HTTPErrorHandler;
	}

	compare = (req, res, next) => {
		// Get the details from the query string
		let pokemon1Name = req.query.pokemon1;
		let pokemon2Name = req.query.pokemon2;

		// Check that two pokemons are sent, if not return an error.
		if (!pokemon1Name || !pokemon2Name) {
			throw new this.errorHandler({
				statusCode: 400,
				description: 'Please enter 2 pokemons.',
			});
		}

		// Pokemon API only supports lowercase
		pokemon1Name = pokemon1Name.toLowerCase();
		pokemon2Name = pokemon2Name.toLowerCase();

		// Invoke the damage service, if succesful return the results.
		// Otherwise handle the error.
		this.damageService
			.compare(pokemon1Name, pokemon2Name)
			.then((response) => {
				this.writeJson(res, response);
			})
			.catch((err) => {
				next(err);
			});
	};
}
