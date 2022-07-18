import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/*
Resources to mock API response
 */
// Get test resources
import testResources from '../pokemon/config/index.js';

// Libraries to read files
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2';

const getPokemonFromJSON = (pokemonName) => {
	const rawdata = fs.readFileSync(
		__dirname + `/../pokemon/data/pokemons/${pokemonName}.json`
	);
	return JSON.parse(rawdata);
};

const getTypeFromJSON = (typeId) => {
	const rawdata = fs.readFileSync(
		__dirname + `/../pokemon/data/types/${typeId}.json`
	);

	return JSON.parse(rawdata);
};

const getMoveFromJSON = (moveId) => {
	const rawdata = fs.readFileSync(
		__dirname + `/../pokemon/data/moves/${moveId}.json`
	);

	return JSON.parse(rawdata);
};

export default class MockHelper {
	constructor() {
		this.mock = new MockAdapter(axios);
		this.apiUrl = process.env.POKEMON_API_BASE_URL;
	}

	mockPokemon = () => {
		// Pokemons
		for (let i = 0; i < testResources.pokemons.length; i++) {
			const pokemonName = testResources.pokemons[i];

			const pokemon = getPokemonFromJSON(pokemonName);

			this.mock
				.onGet(`${this.apiUrl}/pokemon/${pokemonName}`)
				.reply(200, pokemon);
		}
	};

	mockTypes = () => {
		// Types
		for (let i = 0; i < testResources.types.length; i++) {
			const typeId = testResources.types[i];

			const type = getTypeFromJSON(typeId);

			this.mock.onGet(`${this.apiUrl}/type/${typeId}/`).reply(200, type);
		}
	};

	mockMoves = () => {
		// Moves
		for (let i = 0; i < testResources.moves.length; i++) {
			const moveId = testResources.moves[i];

			const move = getMoveFromJSON(moveId);

			this.mock.onGet(`${this.apiUrl}/move/${moveId}/`).reply(200, move);
		}
	};

	reset = () => {
		this.mock.reset();
	};
}
