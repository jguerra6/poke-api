import {
	getPokemon,
	getDamageRealtions,
	compareTypes,
} from '../../pokemon/index.js';

import DamageResponse from '../model/response.js';

import HTTPErrorHandler from '../../util/error-handler/http-error-handler.js';

const compare = async (pokemon1Name, pokemon2Name) => {
	try {
		// Create an array for all the promises used so they can run asynchronously
		const promises = [];

		// Get the details for both pokemons and add them to the promise array
		promises.push(getPokemon(pokemon1Name));
		promises.push(getPokemon(pokemon2Name));

		// Wait for both promises to complete
		let response = await Promise.all(promises);

		// Check the responses match the pokemon names
		const pokemon1 =
			response[0].name === pokemon1Name ? response[0] : response[1];
		const pokemon2 =
			response[1].name === pokemon2Name ? response[1] : response[0];

		// Mapping the rival types
		const rivalTypes = {};
		for (let i = 0; i < pokemon2.types.length; i++) {
			const type = pokemon2.types[i].type.name;
			rivalTypes[type] = 1;
		}

		response = await getDamageRealtions(pokemon1.types);

		response = compareTypes(response, rivalTypes);

		let damageResponse;

		damageResponse = new DamageResponse(response);

		return { status: 200, message: damageResponse };
	} catch (error) {
		const message = error.message
			? error.message
			: 'An error occured while fetching the details of your Pokemons, please try again later or contact your admin.';

		const statusCode = error.response ? error.response.status : 500;

		throw new HTTPErrorHandler({ description: message, statusCode });
	}
};

export default compare;
