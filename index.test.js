import request from 'supertest';

import App from './app/index.js';

import PokemonService from './pokemon/service/index.js';

import MockHelper from './test_resources/mock/index.js';

import axios from 'axios';
import { returnError } from './util/error-handler/index.js';
import { writeJson } from './util/writer/http-writer.js';
import HTTPErrorHandler from './util/error-handler/http-error-handler.js';

describe('integration', () => {
	let mock;

	const dependencies = {
		pokemonService: new PokemonService({ httpRequestor: axios }),
		returnError,
		writeJson,
		HTTPErrorHandler,
	};

	const app = new App(dependencies).getApp();

	beforeAll(() => {
		// Create a Mock for the API requests
		mock = new MockHelper();

		// Mock all the possible requests
		mock.mockPokemon();
		mock.mockTypes();
		mock.mockMoves();
	});

	afterAll(() => {
		mock.reset();
	});

	it('GET /pokemon-compare/damage --> 400 if less than 2 pokemons are sent', () => {
		return request(app)
			.get('/api/v1/pokemon-compare/damage')
			.expect('Content-Type', /json/)
			.expect(400);
	});

	it('GET /pokemon-compare/damage --> Specific response for advantages of a fight between 2 pokemons', () => {
		let pokemonName1 = 'zapdos';
		let pokemonName2 = 'geodude';

		return request(app)
			.get(
				`/api/v1/pokemon-compare/damage?pokemon1=${pokemonName1}&pokemon2=${pokemonName2}`
			)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						deal_double_damage: false,
						receive_half_damage: false,
						receive_zero_damage: true,
					})
				);
			});
	});

	it('GET /pokemon-compare/moves --> Specific response for common moves between 2 pokemons', () => {
		return request(app)
			.get(
				'/api/v1/pokemon-compare/moves/?pokemons=geodude&pokemons=pikachu&limit=10'
			)
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						pokemons: ['geodude', 'pikachu'],
						moves: expect.arrayContaining([
							'mega-punch',
							'thunder-punch',
							'headbutt',
							'body-slam',
							'take-down',
							'double-edge',
						]),
						lang: 'en',
					})
				);
			});
	});
});
