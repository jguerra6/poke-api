// Structure for the Routes
export default class Route {
	constructor(path, method, middlewares, handlers) {
		return { path, method, middlewares, handlers };
	}
}
