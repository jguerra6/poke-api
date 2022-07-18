import path from 'path';
import dotenv from 'dotenv';
import axios from 'axios';

import App from './app/index.js';
import { logError, returnError } from './util/error-handler/index.js';
import { writeJson } from './util/writer/http-writer.js';
import HTTPErrorHandler from './util/error-handler/http-error-handler.js';
import PokemonService from './pokemon/service/index.js';

// Specify configuration path
const configPath = path.join(process.cwd(), '/secret/.env');

// Load configuration settings
dotenv.config({ path: configPath });

// Create a Pokemon Service
const pokemonService = new PokemonService({
	httpRequestor: axios,
});

// Send all dependencies to the app
const dependencies = {
	pokemonService,
	writeJson,
	HTTPErrorHandler,
	returnError,
};

// Start the app with the dependencies and the port
const app = new App(dependencies);
const PORT = process.env.PORT || 5000;
app.listen(PORT);

// Capture uncaught errors, if it's a crash stop the app, otherwise just throw the error
process
	.on('uncaughtException', (error) => {
		logError(error);

		if (!isOperationalError(error)) {
			process.exit(1);
		}
	})
	.on('unhandledRejection', (error) => {
		throw error;
	});

export default app.getApp();
