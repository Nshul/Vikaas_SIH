const express = require('express'),
	router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
	return res.send('Hello');
});

module.exports = router;
