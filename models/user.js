const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
  role: { type: String },
  hasPet: { type: Boolean },
});

module.exports = mongoose.model('User', userSchema);
