const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  //Define properties here
});

module.exports = mongoose.model('Event', eventSchema);
