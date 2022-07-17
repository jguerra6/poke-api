// Import all the routes
import mainRoutes from "./main.js";
import damageRoutes from "./damage.js";
import movesRoutes from "./moves.js";
import testRoutes from "./pokemon.js";

// Join all the routes
const paths = [mainRoutes, damageRoutes, movesRoutes, testRoutes];

export default paths;
