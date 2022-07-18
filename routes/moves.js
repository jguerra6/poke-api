import Route from './entities/index.js';
import Moves from '../moves/controllers/index.js';

export default class DamageRoutes {
	constructor(dependencies) {
		const controller = new Moves(dependencies);
		this.routes = [
			new Route('/pokemon-compare/moves', 'GET', [], controller.getCommonMoves),
		];
	}

	getRoutes = () => {
		return this.routes;
	};
}
