import axios from "axios";

import Pokemon from "./entity/pokemon.js";

// Map with the list of languages and their index on the moves responses
const lang = {
	"ja-Hrkt": 0,
	ko: 1,
	"zh-Hant": 2,
	fr: 3,
	de: 4,
	es: 5,
	it: 6,
	en: 7,
	ja: 8,
	"zh-Hans": 9,
};

const getPokemon = (name) => {
	const url = `${process.env.POKEMON_API_BASE_URL}/pokemon/${name}`;

	return axios
		.get(url)
		.then((response) => {
			return new Pokemon(response.data);
		})
		.catch((err) => {
			console.log(err);
		});
};

const getDamageRealtions = async (types) => {
	const promises = [];

	// Getting all the info for the main Pokemon types
	for (let i = 0; i < types.length; i++) {
		const type = types[i].type;

		const url = `${type.url}`;

		const promise = axios.get(url);
		promises.push(promise);
	}

	let response = await Promise.all(promises);

	const damageRelations = {
		double_damage_to: [],
		double_damage_from: [],
		half_damage_from: [],
		half_damage_to: [],
		no_damage_to: [],
		no_damage_from: [],
	};

	// Merge specs for all the types in one single array per spec.
	for (let i = 0; i < response.length; i++) {
		damageRelations.double_damage_to = damageRelations.double_damage_to.concat(
			damageRelations.double_damage_to,
			response[i].data.damage_relations.double_damage_to
		);
		damageRelations.double_damage_from =
			damageRelations.double_damage_from.concat(
				damageRelations.double_damage_from,
				response[i].data.damage_relations.double_damage_from
			);

		damageRelations.half_damage_from = damageRelations.half_damage_from.concat(
			damageRelations.half_damage_from,
			response[i].data.damage_relations.half_damage_from
		);
		damageRelations.half_damage_to = damageRelations.half_damage_to.concat(
			damageRelations.half_damage_to,
			response[i].data.damage_relations.half_damage_to
		);

		damageRelations.no_damage_to = damageRelations.no_damage_to.concat(
			damageRelations.no_damage_to,
			response[i].data.damage_relations.no_damage_to
		);
		damageRelations.no_damage_from = damageRelations.no_damage_from.concat(
			damageRelations.no_damage_from,
			response[i].data.damage_relations.no_damage_from
		);
	}

	return damageRelations;
};

const compareTypes = (pokemon1, rivalTypes) => {
	const result = {
		deal_double_damage: false,
		receive_half_damage: false,
		receive_zero_damage: false,
	};

	// Loop double_damage_to to check if the rival has the types listed
	for (let i = 0; i < pokemon1.double_damage_to.length; i++) {
		const type = pokemon1.double_damage_to[i].name;
		if (rivalTypes[type]) {
			result.deal_double_damage = true;
		}
	}

	// Parse double_damage_from to check if the rival has the types listed
	// for (let i = 0; i < pokemon1.double_damage_from.length; i++) {
	// 	const type = pokemon1.double_damage_from[i].name;
	// 	if (rivalTypes[type]) {
	// 		result.deal_double_damage = true;
	// 	}
	// }

	// Parse half_damage_to to check if the rival has the types listed
	// for (let i = 0; i < pokemon1.half_damage_to.length; i++) {
	// 	const type = pokemon1.half_damage_to[i].name;
	// 	if (rivalTypes[type]) {
	// 		result.deal_double_damage = true;
	// 	}
	// }

	// // Parse half_damage_from to check if the rival has the types listed
	for (let i = 0; i < pokemon1.half_damage_from.length; i++) {
		const type = pokemon1.half_damage_from[i].name;
		if (rivalTypes[type]) {
			result.receive_half_damage = true;
		}
	}

	// // Parse no_damage_to to check if the rival has the types listed
	// for (let i = 0; i < pokemon1.no_damage_to.length; i++) {
	// 	const type = pokemon1.no_damage_to[i].name;
	// 	if (rivalTypes[type]) {
	// 		result.deal_double_damage = true;
	// 	}
	// }

	// // Parse no_damage_from to check if the rival has the types listed
	for (let i = 0; i < pokemon1.no_damage_from.length; i++) {
		const type = pokemon1.no_damage_from[i].name;
		if (rivalTypes[type]) {
			result.receive_zero_damage = true;
		}
	}

	return result;
};

const translateMove = async (move, langCode) => {
	// If the language is english, there is not anything else to be done
	if (lang === "en") {
		return move.name;
	}

	// Get the language index from the configuartion array
	const langIndex = lang[langCode];

	// Get the details for a move and return it's name on the spefic language
	return axios

		.get(move.url)
		.then((response) => {
			// const moveName = response.data ? response.data.names[langIndex].name
			return response.data.names[langIndex].name;
		})
		.catch((err) => {
			console.log(err);
		});
};

export { getPokemon, getDamageRealtions, compareTypes, translateMove };
