const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: { type: String },
  eventStartDate: { type: Date },
  eventEndDate: { type: Date },
  eventStartTime: { type: String },
  eventEndTime: { type: String },
  eventSummary: { type: String },
  eventImage: { type: String },
  eventVenue: { type: String },
  eventCreator: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);
