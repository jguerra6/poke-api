import httpStatusCodes from "./http-status-codes.js";
import BaseError from "./base-error.js";

class HTTPErrorHandler extends BaseError {
	constructor({
		name,
		statusCode = httpStatusCodes.INTERNAL_SERVER,
		description = "Internal Server error.",
		isOperational = true,
	}) {
		super(name, statusCode, isOperational, description);
	}
}

export default HTTPErrorHandler;
