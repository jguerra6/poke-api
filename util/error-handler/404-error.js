import httpStatusCodes from "./http-status-codes.js";
import BaseError from "./base-error.js";

class Api404Error extends BaseError {
	constructor(
		name,
		statusCode = httpStatusCodes.NOT_FOUND,
		description = "Not found.",
		isOperational = true
	) {
		super(name, statusCode, isOperational, description);
	}
}

export default Api404Error;
