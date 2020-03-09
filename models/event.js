const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: { type: String },
  eventStardDate: { type: Date },
  eventEndDate: {type: Date},
  eventStartTime: {type: String},
  eventEndTime:{type: String},
  eventSummary: {type:String},
  eventVenue: { type: String }});

module.exports = mongoose.model('Event', eventSchema);
