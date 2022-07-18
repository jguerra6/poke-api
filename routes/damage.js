import Route from './entities/index.js';

import Damage from '../damage/controllers/index.js';

export default class DamageRoutes {
	constructor(dependencies) {
		const controller = new Damage(dependencies);
		this.routes = [
			new Route('/pokemon-compare/damage', 'GET', [], controller.compare),
		];
	}

	getRoutes = () => {
		return this.routes;
	};
}
