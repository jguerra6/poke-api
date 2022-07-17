import {
	getPokemon,
	translateMove,
	getDamageRealtions,
} from "../pokemon/index.js";

import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createPokemonJSON = async (pokemonName) => {
	process.env.POKEMON_API_BASE_URL = "https://pokeapi.co/api/v2";
	const pk = await getPokemon(pokemonName);

	const types = [];
	const moves = [];

	let limit = 10;

	for (let i = 0; i < pk.types.length; i++) {
		const element = pk.types[i];
		const typeId = element.type.url
			.replace("https://pokeapi.co/api/v2/type/", "")
			.replace("/", "");

		createTypeJSON(typeId, element);
		types.push({
			type: {
				name: element.type.name,
				url: element.type.url.replace(
					"https://pokeapi.co/api/v2",
					"http://localhost:80/api/v1"
				),
			},
		});
	}

	for (let i = 0; i < pk.moves.length; i++) {
		const element = pk.moves[i];
		const moveId = element.move.url
			.replace("https://pokeapi.co/api/v2/move/", "")
			.replace("/", "");

		if (limit) {
			limit--;

			createMoveJSON(moveId, element.move);
			moves.push({
				move: {
					name: element.move.name,
					url: element.move.url.replace(
						"https://pokeapi.co/api/v2",
						"http://localhost:80/api/v1"
					),
				},
			});
		}
	}

	const obj = {
		name: pk.name,
		types,
		moves,
	};
	let data = JSON.stringify(obj);
	fs.writeFileSync(__dirname + `/pokemon/data/pokemons/${pk.name}.json`, data);
};

const createMoveJSON = async (moveId, moveObj) => {
	const move = await translateMove(moveObj, "es");
	const names = [];
	names[5] = { name: move };
	names[7] = { name: moveObj.name };
	let data = JSON.stringify({
		name: moveObj.name,
		names: names,
	});

	fs.writeFileSync(__dirname + `/pokemon/data/moves/${moveId}.json`, data);
};

const createTypeJSON = async (typeId, typeObj) => {
	const types = [];
	types.push(typeObj);
	let damage = await getDamageRealtions(types);
	damage = { damage_relations: damage };
	let data = JSON.stringify(damage);
	fs.writeFileSync(__dirname + `/pokemon/data/types/${typeId}.json`, data);
};

const testPokemons = ["ditto", "pikachu", "zapdos", "geodude"];

for (let i = 0; i < testPokemons.length; i++) {
	const pokemon = testPokemons[i];
	createPokemonJSON(pokemon);
}

/*
/Users/jguerra/Documents/Personal/PokeApi/test_resources
/Users/jguerra/Documents/Personal/PokeApi/test_resources/data/pokemons/ditto.json

*/
