const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const roommateSchema = new Schema({
  email: {type: String, unique: true},
  firstName: { type: String },
  lastName: { type: String },
  listingAddress: {type: String, unique: true},
  phoneNumber: {type: Number},
  summary: {type:String}
  });

module.exports = mongoose.model('Roommate', roommateSchema);
