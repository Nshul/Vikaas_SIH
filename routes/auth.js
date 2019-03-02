const express = require('express'),
	authy = require('authy')('IHaWlw6tuCPP0zEYCSGXGmDYJ8MGGxmY'),
	router = express.Router({ mergeParams: true });

router.get('/sendotp', (req, response) => {
	authy.phones().verification_start('8527370012', '91', 'sms', function(err, res) {
		if (err) {
			response.send(err);
		}

		response.render('otp');
	});
});

router.post('/verifyotp', (req, response) => {
	authy.phones().verification_check('8527370012', '91', req.body.otp, function(err, res) {
		if (err) {
			// invalid token
			response.send(err);
			err;
		}

		response.send('Success');
	});
});

module.exports = router;
