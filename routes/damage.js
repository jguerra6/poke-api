import Route from "./entities/index.js";

import Damage from "../damage/controllers/index.js";

const dependencies = {};

const controller = new Damage(dependencies);

export default [
	new Route("/pokemon-compare/damage", "GET", [], controller.compare),
];
