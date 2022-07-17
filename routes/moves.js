import Route from "./entities/index.js";

import Moves from "../moves/controllers/index.js";

const dependencies = {};

const controller = new Moves(dependencies);

export default [
	new Route("/pokemon-compare/moves", "GET", [], controller.getCommonMoves),
];
