import { writeJson } from "../../../util/writer/http-writer.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Pokemon {
	getPokemon = (req, res, next) => {
		const pokemonName = req.params.name;

		let rawdata = fs.readFileSync(
			__dirname + `/../data/pokemons/${pokemonName}.json`
		);
		let pokemon = JSON.parse(rawdata);

		writeJson(res, { message: pokemon });
	};

	getType = (req, res, next) => {
		const typeId = req.params.typeId;

		let rawdata = fs.readFileSync(__dirname + `/../data/types/${typeId}.json`);
		let pokemon = JSON.parse(rawdata);

		writeJson(res, { message: pokemon });
	};

	getMove = (req, res, next) => {
		const moveId = req.params.moveId;

		let rawdata = fs.readFileSync(__dirname + `/../data/moves/${moveId}.json`);
		let pokemon = JSON.parse(rawdata);

		writeJson(res, { message: pokemon });
	};
}
