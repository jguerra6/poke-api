import Api400Error from '../../util/error-handler/400-error.js';
import writeJson from '../../util/writer/http-writer.js';

import damageService from '../service/index.js';

// eslint-disable-next-line require-jsdoc
export default class Damage {
	// eslint-disable-next-line require-jsdoc
	constructor() {}

	compare = (req, res, next) => {
		// Get the details from the query string
		let pokemon1Name = req.query.pokemon1;
		let pokemon2Name = req.query.pokemon2;

		// Check that two pokemons are sent, if not return an error.
		if (!pokemon1Name || !pokemon2Name) {
			throw new Api400Error({ description: 'Please enter 2 pokemons.' });
		}

		// Pokemon API only supports lowercase
		pokemon1Name = pokemon1Name.toLowerCase();
		pokemon2Name = pokemon2Name.toLowerCase();

		// Invoke the damage service, if succesful return the results.
		// Otherwise handle the error.
		damageService(pokemon1Name, pokemon2Name)
			.then((response) => {
				writeJson(res, response);
			})
			.catch((err) => {
				next(err);
			});
	};
}
