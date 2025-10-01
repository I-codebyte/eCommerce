const myPromise = new Promise(function (resolve, reject) {
	const x = null;
	if (x) {
		return resolve("the code actually works");
	}
	return reject("it works but x is a falsy value");
});

myPromise.then(
	function (value) {
		console.log(value);
	},
	function (error) {
		console.log(error);
	}
);
