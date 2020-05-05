const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: { type: String, unique: true },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
});

module.exports = mongoose.model('Address', addressSchema);
