import Route from "./entities/index.js";

export default [
	new Route("/health", "GET", [], (req, res) => {
		res.status(200).json({ message: "OK" });
	}),
];
