import BaseError from './base-error.js';

const logError = (err) => {
	process.env.NODE_ENV !== 'test' && console.error(err);
};

const logErrorMiddleware = (err, _req, _res, next) => {
	logError(err);
	next(err);
};

const returnError = (err, _req, res, _next) => {
	logError(err);
	res.status(err.statusCode || 500).json({ message: err.message });
};

const isOperationalError = (error) => {
	if (error instanceof BaseError) {
		return error.isOperational;
	}
	return false;
};

export { logError, logErrorMiddleware, returnError, isOperationalError };
