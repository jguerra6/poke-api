// Structure for the Moves compare response
export default class MovesResponse {
	constructor({ pokemons = [], moves = [], lang = "en" }) {
		this.pokemons = pokemons;
		this.moves = moves;
		this.lang = lang;
	}
}
