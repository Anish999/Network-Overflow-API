const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRoutes = require('./routes/users-routes');
const roommatesRoutes = require('./routes/roommates-routes');
const eventsRoutes = require('./routes/events-routes');
const loginRoutes = require('./routes/login-routes');
const profile = require('./routes/profile');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/roommates', roommatesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api', loginRoutes);
app.use('/api/profile', profile);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error has occured!' });
});

const username = 'pankajsherchan';
const password = 'test';
let url = `mongodb+srv://${username}:${password}@phase2-415-n2ctl.mongodb.net/network-overflow?retryWrites=true&w=majority`;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running....`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
