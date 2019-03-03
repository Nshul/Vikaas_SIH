const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const indexRoutes = require('./routes/index'),
  authRoutes = require('./routes/auth'),
  userRoutes = require('./routes/user'),
  commentRoutes = require('./routes/comment'),
  mpRoutes = require('./routes/mp'),
  complaintRoutes = require('./routes/complaint'),
  pythonScripts = require('./routes/pythonScripts');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://vikaas:sih2019@ds029106.mlab.com:29106/sih');

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', complaintRoutes);
app.use('/', userRoutes);
app.use('/', commentRoutes);
app.use('/', mpRoutes);
app.use('/', pythonScripts);

app.listen(8000, () => {
  console.log('Server has started');
});
