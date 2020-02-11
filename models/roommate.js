const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const roommateSchema = new Schema({
  //Define properties here
});

module.exports = mongoose.model('Roommate', roommateSchema);
