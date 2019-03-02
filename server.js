const express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

const indexRoutes = require('./routes/index'),
	authRoutes = require('./routes/auth'),
	complaintRoutes = require('./routes/complaint');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vikaas:sih2019@ds029106.mlab.com:29106/sih');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', complaintRoutes);

app.listen(8000, () => {
	console.log('Server has started');
});
