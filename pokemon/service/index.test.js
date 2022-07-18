import MockHelper from '../../test_resources/mock/index.js';
import DamageRelations from '../model/damage-relation.js';
import Pokemon from '../model/pokemon.js';

import PokemonService from './index.js';

// Used library to mock network requests
import axios from 'axios';

describe('unit', () => {
	let mock;
	let pokemonService;

	beforeAll(() => {
		mock = new MockHelper();

		mock.mockPokemon();

		pokemonService = new PokemonService({ httpRequestor: axios });
	});

	afterAll(() => {
		mock.reset();
	});

	it('getPokemon() --> A pokemon should be returned', async () => {
		const response = await pokemonService.getPokemon('pikachu');
		expect(response).toBeInstanceOf(Pokemon);
	});

	it('getDamageRelations() --> The damage Relation should be returned should be returned', async () => {
		const pokemonTypes = {
			types: [
				{
					type: {
						name: 'electric',
						url: 'https://pokeapi.co/api/v2/type/13/',
					},
				},
				{
					type: {
						name: 'flying',
						url: 'https://pokeapi.co/api/v2/type/3/',
					},
				},
			],
		};
		const response = await pokemonService.getDamageRelations(pokemonTypes);

		expect(response).toBeInstanceOf(DamageRelations);
	});
});
