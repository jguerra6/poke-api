import request from "supertest";
// import app from "./router/index.js";
import App from "./router/index.js";

const app = new App();
const router = app.getApp();
app.listen(80);

describe("Pokemon API", () => {
	it("GET /pokemon-compare/damage --> 400 if less than 2 pokemons are sent", () => {
		return request(router)
			.get("/api/v1/pokemon-compare/damage")
			.expect("Content-Type", /json/)
			.expect(400);
	});

	it("GET /pokemon-compare/damage --> Generic response for advantages of a fight between 2 pokemons", () => {
		process.env.POKEMON_API_BASE_URL = "http://localhost:80/api/v1";
		return request(router)
			.get("/api/v1/pokemon-compare/damage?pokemon1=zapdos&pokemon2=geodude")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						deal_double_damage: expect.any(Boolean),
						receive_half_damage: expect.any(Boolean),
						receive_zero_damage: expect.any(Boolean),
					})
				);
			});
	});

	it("GET /pokemon-compare/damage --> Specific response for advantages of a fight between 2 pokemons", () => {
		process.env.POKEMON_API_BASE_URL = "http://localhost:80/api/v1";
		return request(router)
			.get("/api/v1/pokemon-compare/damage?pokemon1=zapdos&pokemon2=geodude")
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						deal_double_damage: false,
						receive_half_damage: false,
						receive_zero_damage: true,
					})
				);
			});
	});

	it("GET /pokemon-compare/moves --> Specific response for common moves between 2 pokemons", () => {
		process.env.POKEMON_API_BASE_URL = "http://localhost:80/api/v1";
		return request(router)
			.get(
				"/api/v1/pokemon-compare/moves/?pokemons=geodude&pokemons=pikachu&limit=10"
			)
			.expect("Content-Type", /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(
					expect.objectContaining({
						pokemons: ["geodude", "pikachu"],
						moves: expect.arrayContaining([
							"mega-punch",
							"thunder-punch",
							"headbutt",
							"body-slam",
							"take-down",
							"double-edge",
						]),
						lang: "en",
					})
				);
			});
	});
});
