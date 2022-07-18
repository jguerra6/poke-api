import MovesResponse from '../model/response.js';

export default class MovesService {
	constructor(dependencies) {
		this.pokemonService = dependencies.pokemonService;
		this.httpErrorHandler = dependencies.HTTPErrorHandler;
	}
	compare = async ({ pokemons, limit, lang }) => {
		try {
			// Create an array for all the promises used so they can run asynchronously
			const promises = [];

			// Get the details for all pokemons and add them to the promise array
			for (const pokemon of pokemons) {
				promises.push(this.pokemonService.getPokemon(pokemon));
			}

			// Wait for all promises to complete
			let response = await Promise.all(promises);

			// Create a Map of all the moves and count their occurences
			const allMoves = {};

			for (const pokemon of response) {
				const moves = pokemon.moves;
				for (const moveObj of moves) {
					const move = moveObj.move;
					// Chceck if the move already exists on the map, if yes add 1 to the count, otherwise initialize it with 1
					let count = allMoves[move.name] ? allMoves[move.name].count + 1 : 1;

					// Create an object with the move url, count of appearences in all pokemons and the name.
					allMoves[move.name] = {
						count,
						url: move.url,
						name: move.name,
					};
				}
			}

			// Search in the map for all the moves that are present the same number of times as pokemons, meaning they have those in common
			const commonMoves = [];
			for (const move in allMoves) {
				if (allMoves[move].count === pokemons.length && limit) {
					// Reduce the limit by 1 to only return the requested number of moves
					limit--;

					// Get the move name on the correct langauge
					const promise = this.pokemonService
						.translateMove(allMoves[move], lang)
						.then((moveName) => {
							commonMoves.push(moveName);
						})
						.catch((err) => {
							console.log(err);
						});
					promises.push(promise);
				}
			}

			// Wait for all the requests to get the move details complete.
			await Promise.all(promises);

			// Create a moveResponse to send
			const movesResponse = new MovesResponse({
				pokemons,
				moves: commonMoves,
				lang,
			});

			// Return a succesful operation.
			return { status: 200, message: movesResponse };
		} catch (error) {
			// Internally log the error message
			console.log(error.message);

			// If there is an error message send it to the API response, otherwise send a generic one
			const message = error.message
				? error.message
				: 'An error occured while fetching the details of your Pokemons, please try again later or contact your admin.';

			const statusCode = error.response ? error.response.status : 500;

			throw new this.httpErrorHandler({ description: message, statusCode });
		}
	};
}
