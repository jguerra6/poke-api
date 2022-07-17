// Routes for testing
import Route from "./entities/index.js";

import Pokemon from "../test_resources/pokemon/controller/index.js";

const dependencies = {};

const controller = new Pokemon(dependencies);

export default [
	new Route("/pokemon/:name", "GET", [], controller.getPokemon),
	new Route("/type/:typeId", "GET", [], controller.getType),
	new Route("/move/:moveId", "GET", [], controller.getMove),
];
