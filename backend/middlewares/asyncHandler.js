const asyncHandler = function (fn) {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch((error) => {
			res.status(500).send(error);
		});
	};
};

export default asyncHandler;
