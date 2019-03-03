const express = require('express'),
	User = require('../models/user'),
	router = express.Router({ mergeParams: true });

router.post('/adduser', (req, res) => {
	// console.log('req', req.body);

	User.find({
		phone: req.body.phone
	})
		.then((user) => {
			if (user.length > 0) {
				return res.send('user already exists');
			}

			User.create({
				name: req.body.name,
				phone: req.body.phone,
				state: req.body.state,
				city: req.body.city,
				constituency: req.body.constituency
			})
				.then((User) => {
					return res.send('user added');
				})
				.catch((err) => {
					return res.send('error: db create user');
				});
		})
		.catch((err) => {
			console.log('ERROR: ', err);
			res.send('error: db access user');
		});
});

router.get('/users', (req, res) => {
	// console.log(req.body);

	User.find({})
		.then((Users) => {
			return res.send(Users);
		})
		.catch((err) => {
			return res.send('error: db find users');
		});
});

module.exports = router;
