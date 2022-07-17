const writeJson = (res, payload) => {
	let status = payload.status || 200;

	res.status(status).json(payload.message);
};

export { writeJson };
