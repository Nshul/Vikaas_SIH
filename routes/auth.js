const express = require('express'),
	authy = require('authy')('KZTxoZOGdTlhwKKC9bg85pPkJirTFq9n'),
	User = require('../models/user'),
	Mp = require('../models/mp'),
	router = express.Router({ mergeParams: true });

router.post('/requestotp', (req, response) => {
	console.log(req.body);

	// authy.phones().verification_start(req.body.phone, '91', 'sms', function(err, res) {
	// 	if (err) {
	// 		console.log(err);
	// 		return response.send(err);
	// 	}

	// 	// response.render('otp');
	// 	return response.send('success');
	// });

	return response.send('success');
});

router.post('/user/verifyotp', (req, response) => {
	// authy.phones().verification_check(req.body.phone, '91', req.body.otp, function(err, res) {
	// 	if (err) {
	// 		// invalid token
	// 		console.log(err);
	// 		return response.send(err);
	// 	}

	// 	User.find({
	// 		phone: req.body.phone
	// 	})
	// 		.then((User) => {
	// 			return response.send(User);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);

	// 			return response.send(err);
	// 		});
	// });

	User.find({
		phone: req.body.phone
	})
		.then((User) => {
			return response.send(User);
		})
		.catch((err) => {
			console.log(err);

			return response.send(err);
		});
});

router.post('/mp/verifyotp', (req, response) => {
	// authy.phones().verification_check(req.body.phone, '91', req.body.otp, function(err, res) {
	// 	if (err) {
	// 		// invalid token
	// 		response.send(err);
	// 		err;
	// 	}

	// 	Mp.find({
	// 		phone: req.body.phone
	// 	})
	// 		.then((mp) => {
	// 			if (!!!mp) {
	// 				return response.send(err);
	// 			}

	// 			return response.send(mp);
	// 		})
	// 		.catch((err) => {
	// 			return response.send(err);
	// 		});
	// });

	User.find({
		phone: req.body.phone
	})
		.then((User) => {
			return response.send(User);
		})
		.catch((err) => {
			return response.send(err);
		});
});

module.exports = router;
