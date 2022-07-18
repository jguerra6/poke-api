// Import all the routes
import mainRoutes from './main.js';
import DamageRouter from './damage.js';
import MovesRouter from './moves.js';

export default class Router {
	constructor(dependencies) {
		const damageRouter = new DamageRouter(dependencies);
		const movesRouter = new MovesRouter(dependencies);
		// Join all the routes
		this.paths = [
			mainRoutes,
			damageRouter.getRoutes(),
			movesRouter.getRoutes(),
		];
	}

	getPaths = () => {
		return this.paths;
	};
}
