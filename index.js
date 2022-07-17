import path from "path";
import dotenv from "dotenv";
// import app from "./router/index.js";
import App from "./router/index.js";

import DamageService from "./damage/service/index.js";

// Specify configuration path
const configPath = path.join(process.cwd(), "/secret/.env");

// Load configuration settings
dotenv.config({ path: configPath });

// Send all dependencies to the app

const PORT = process.env.PORT || 5000;

const app = new App();
app.listen(PORT);

// app.listen(PORT, () => {
// 	console.log(`Server run at ${PORT}`);
// });

process
	.on("uncaughtException", (error) => {
		logError(error);

		if (!isOperationalError(error)) {
			process.exit(1);
		}
	})
	.on("unhandledRejection", (error) => {
		throw error;
	});
