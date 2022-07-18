import DamageResponse from '../model/response.js';

export default class DamageService {
	constructor(dependencies) {
		this.pokemonService = dependencies.pokemonService;
		this.httpErrorHandler = dependencies.HTTPErrorHandler;
	}

	compare = async (pokemon1Name, pokemon2Name) => {
		try {
			// Create an array for all the promises used so they can run asynchronously
			const promises = [];

			// Get the details for both pokemons and add them to the promise array
			promises.push(this.pokemonService.getPokemon(pokemon1Name));
			promises.push(this.pokemonService.getPokemon(pokemon2Name));

			// Wait for both promises to complete
			let response = await Promise.all(promises);

			// Check the responses match the pokemon names
			const pokemon1 =
				response[0].name === pokemon1Name ? response[0] : response[1];
			const pokemon2 =
				response[1].name === pokemon2Name ? response[1] : response[0];

			response = await this.pokemonService.compareDamage(pokemon1, pokemon2);
			let damageResponse = new DamageResponse(response);

			return { message: damageResponse };
		} catch (error) {
			const message = error.message
				? error.message
				: 'An error occured while fetching the details of your Pokemons, please try again later or contact your admin.';

			const statusCode = error.response ? error.response.status : 500;

			throw new this.httpErrorHandler({ description: message, statusCode });
		}
	};
}
