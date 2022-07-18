import express from 'express';
import cleanroutes from '../util/clean-router/index.js';

import Router from '../routes/index.js';

export default class App {
	constructor(dependencies) {
		// Creating the app
		this.app = express();

		// Creating the subrouter for the API path
		const subRouter = express.Router();
		this.app.use('/api/v1', subRouter);

		// Middlewares
		subRouter.use(express.json());

		this.router = new Router(dependencies);
		const routes = this.router.getPaths();

		subRouter.use('/', cleanroutes(routes));

		//Undefined paths
		this.app.use('*', (req, res) => {
			throw new dependencies.HTTPErrorHandler({
				statusCode: 404,
				description: `Page not found.`,
			});
		});

		// Handle the errors
		this.app.use(dependencies.returnError);
	}

	listen = (port, actions) => {
		// Create the actual app and listen to the port
		this.app.listen(port, () => {
			console.log(`Server run at ${port}`);
		});
	};

	getApp = () => {
		return this.app;
	};
}
