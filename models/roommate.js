const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const roommateSchema = new Schema({
  listingType: {type: String}, 
  email: {type: String},
  firstName: { type: String },
  lastName: { type: String },
  listingAddress: {type: String},
  phoneNumber: {type: String},
  summary: {type:String},
  image : {type:String}

  });

module.exports = mongoose.model('Roommate', roommateSchema);
