import express from "express";
import cleanroutes from "../util/clean-router/index.js";
import Api404Error from "../util/error-handler/404-error.js";
import router from "../routes/index.js";
import { returnError } from "../util/error-handler/index.js";

export default class App {
	constructor() {
		// Creating the app
		this.app = express();

		// Creating the subrouter for the API path
		const subRouter = express.Router();
		this.app.use("/api/v1", subRouter);

		// Middlewares
		subRouter.use(express.json());

		subRouter.use("/", cleanroutes(router));

		//Undefined paths
		this.app.use("*", (req, res) => {
			throw new Api404Error(`Page not found.`);
		});

		// Handle the errors
		this.app.use(returnError);
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

// const app = express();

// // Creating the subrouter for the API path
// const subRouter = express.Router();
// app.use("/api/v1", subRouter);

// // Middlewares
// subRouter.use(express.json());

// subRouter.use("/", cleanroutes(router));

// //Undefined paths
// app.use("*", (req, res) => {
// 	throw new Api404Error(`Page not found.`);
// });

// // Handle the errors
// app.use(returnError);

// export default app;
