import Pokemon from '../model/pokemon.js';
import DamageRelations from '../model/damage-relation.js';

import config from '../config/config.js';

const supportedLanguages = config.SUPPORTED_LANGUAGES;

export default class PokemonService {
	constructor(dependencies) {
		this.httpRequestor = dependencies.httpRequestor;
		this.httpErrorHandler = dependencies.HTTPErrorHandler;
	}

	getPokemon = (name) => {
		const url = `${process.env.POKEMON_API_BASE_URL}/pokemon/${name}`;

		return this.httpRequestor
			.get(url)
			.then((response) => {
				return new Pokemon(response.data);
			})
			.catch((err) => {
				if (err.response && err.response.status === 404) {
					throw new Error('Pokemon not found, please check your spelling.');
				}
			});
	};

	getDamageRelations = async (types) => {
		const promises = [];

		// Getting all the info for the main Pokemon types
		for (const typeObj of types) {
			const type = typeObj.type;

			const url = `${type.url}`;

			const promise = this.httpRequestor.get(url);

			promises.push(promise);
		}

		let response = await Promise.all(promises);

		const damageRelations = new DamageRelations();

		// Merge specs for all the types in one single array per spec.
		for (const typeObj of response) {
			const typeInfo = typeObj.data.damage_relations;

			damageRelations.double_damage_to =
				damageRelations.double_damage_to.concat(
					damageRelations.double_damage_to,
					typeInfo.double_damage_to
				);
			damageRelations.double_damage_from =
				damageRelations.double_damage_from.concat(
					damageRelations.double_damage_from,
					typeInfo.double_damage_from
				);

			damageRelations.half_damage_from =
				damageRelations.half_damage_from.concat(
					damageRelations.half_damage_from,
					typeInfo.half_damage_from
				);
			damageRelations.half_damage_to = damageRelations.half_damage_to.concat(
				damageRelations.half_damage_to,
				typeInfo.half_damage_to
			);

			damageRelations.no_damage_to = damageRelations.no_damage_to.concat(
				damageRelations.no_damage_to,
				typeInfo.no_damage_to
			);
			damageRelations.no_damage_from = damageRelations.no_damage_from.concat(
				damageRelations.no_damage_from,
				typeInfo.no_damage_from
			);
		}

		return damageRelations;
	};

	// Loop the damage spec and check if it the rival has the listed type
	parseDamages = (pokemon, arg, rivalTypes) => {
		for (const spec of pokemon[`${arg}`]) {
			const type = spec.name;
			if (rivalTypes[type]) {
				return true;
			}
		}

		return false;
	};

	compareTypes = (pokemon1, rivalTypes) => {
		const result = {
			deal_double_damage: false,
			receive_half_damage: false,
			receive_zero_damage: false,
		};

		// Loop double_damage_to to check if the rival has the types listed
		result.deal_double_damage = this.parseDamages(
			pokemon1,
			'double_damage_to',
			rivalTypes
		);

		// Parse double_damage_from to check if the rival has the types listed
		// result.deal_double_damage = parseDamages(
		// 	pokemon1,
		// 	'double_damage_from',
		// 	rivalTypes
		// );

		// Parse half_damage_to to check if the rival has the types listed
		// result.deal_double_damage = parseDamages(
		// 	pokemon1,
		// 	'half_damage_to',
		// 	rivalTypes
		// );

		// Parse half_damage_from to check if the rival has the types listed
		result.receive_half_damage = this.parseDamages(
			pokemon1,
			'half_damage_from',
			rivalTypes
		);

		// Parse no_damage_to to check if the rival has the types listed
		// result.receive_half_damage = parseDamages(
		// 	pokemon1,
		// 	'no_damage_to',
		// 	rivalTypes
		// );

		result.receive_zero_damage = this.parseDamages(
			pokemon1,
			'no_damage_from',
			rivalTypes
		);

		return result;
	};

	compareDamage = async (pokemon1, pokemon2) => {
		// Mapping the rival types
		const rivalTypes = {};
		for (const typeObj of pokemon2.types) {
			const type = typeObj.type.name;
			rivalTypes[type] = 1;
		}

		let response = await this.getDamageRelations(pokemon1.types);

		return this.compareTypes(response, rivalTypes);
	};

	translateMove = async (move, langCode) => {
		// If the language is english, there is not anything else to be done
		if (langCode === 'en') {
			return move.name;
		}

		// Get the language index from the configuartion array
		const langIndex = supportedLanguages[langCode];

		// Get the details for a move and return it's name on the spefic language
		return this.httpRequestor
			.get(move.url)
			.then((response) => {
				return response.data.names[langIndex].name;
			})
			.catch((err) => {
				console.log(err);
			});
	};
}
