const asyncHandler = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch((error) => {
		res.status(500).send(`something is wrong ${error}`);
	});
};

export default asyncHandler;
