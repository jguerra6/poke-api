import httpStatusCodes from "./http-status-codes.js";
import BaseError from "./base-error.js";

class Api400Error extends BaseError {
	constructor({
		name,
		statusCode = httpStatusCodes.BAD_REQUEST,
		description = "Bad Request.",
		isOperational = true,
	}) {
		super(name, statusCode, isOperational, description);
	}
}

export default Api400Error;
