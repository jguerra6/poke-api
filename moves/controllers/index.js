import Api400Error from "../../util/error-handler/400-error.js";
import { writeJson } from "../../util/writer/http-writer.js";

import movesService from "../service/index.js";

export default class Moves {
	constructor() {
		// super();
	}

	getCommonMoves = (req, res, next) => {
		// Get all the paramaters and set their defaults if not passed
		let pokemons = req.query.pokemons;
		let lang = req.query.lang || "en";
		let limit = req.query.limit || 100;

		// Allow a different way to send the parameters on the query string
		if (typeof pokemons === "string") {
			pokemons = pokemons.split(",");
		}

		// Check if at least 2 pokemons were sent, otherwise send an error message.
		if (pokemons.length < 2) {
			throw new Api400Error({
				description: "Please enter at least 2 pokemons.",
			});
		}

		// Invoke the moves service, if succesful return the results. Otherwise handle the error.
		movesService({ pokemons, lang, limit })
			.then((response) => {
				writeJson(res, response);
			})
			.catch((err) => {
				console.log(err);
				next(err);
			});
	};
}
