const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const roommateSchema = new Schema({
  listingType: { type: String },
  address: { type: String },
  user: { type: String },
  contactNumber: { type: String },
  description: { type: String },
  image: { type: String },
  petsAllowed: { type: Boolean },
  datePosted: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Roommate', roommateSchema);
