const mongoose = require('mongoose');
const Event = require('../models/event');


//get events
const getEvents = async (req, res, next) => {
  let events;
  try {
    events = await Event.find();
  } catch (err) {
    const error = new Error('Something went wrong! The event could not be found');
    error.code = 500;
    return next(error);
  }
  res.json({ events: events.map(Event => Event.toObject({ getters: true })) });
};

//get event by id
const getEventById = async (req, res, next) => {
  const eventId = req.params.eid;

  let event;

  try {
    event = await Event.findById(eventId);
  } catch (err) {
    const error = new Error('Something went wrong! EVent could not be found');
    error.code = 500;
    return next(error);
  }

  if (!event) {
    const error = new Error('Event not found.');
    error.code = 404;
    return next(error);
  }

  res.json({ event: event.toObject({ getters: true }) });};

//create event
const createEvent = async (req, res, next) => {
  const { eventName, eventStartDate, eventStartTime,eventEndDate,eventEndTime, eventVenue, eventSummary } = req.body;
  let existingEvent;
  try {
    existingEvent = await Event.findOne({ eventName: eventName });
  } catch (err) {
    const error = new Error('Could not create the event. Try again');
    error.code = 500;
    return next(error);
  }
  if (existingEvent) {
    const message = 'Event already exists';
    return res.json({ message });
  }

   const event = new Event({
    eventName, 
    eventStartDate,
    eventStartTime,
    eventEndDate,
    eventEndTime,
    eventVenue,
    eventSummary
  });

  try {
    await event.save();
  } catch (err) {
    const error = new Error('Something went wrong, event could not be added!');
    error.code = 500;
    return next(err);
  }

  res.json({ event: event.toObject({ getters: true }) });
};

//edit event
const editEvent = async (req, res, next) => {
  const eventId = req.body.id;
  const {  eventName, eventStartDate, eventStartTime,eventEndDate,eventEndTime, eventVenue, eventSummary  } = req.body;
  let event;

  try {
    event = await Event.findById(eventId);
  } catch (err) {
    const error = new Error('Something went wrong. Could not update the event.');
    error.code = 500;
    return next(error);
  }

  if (!event) {
    const error = new Error('Event not found.');
    error.code = 404;
    return next(error);
  } else {
    event.eventName= eventName;
    event.eventStartDate= eventStartDate;
    event.eventStartTime= eventStartTime;
    event.eventEndDate= eventEndDate;
    event.eventEndTime=eventEndTime;
    event.eventVenue= eventVenue;
    event.eventSummary= eventSummary;
    
    try {
      await event.save();
    } catch (err) {
      const error = new Error('Something went wrong, could not update the Event');
      error.code = 500;
      return next(error);
    }
  }

  res.json({ event: event.toObject({ getters: true }) });};

//delete event
const deleteEvent = async (req, res, next) => {
  const eventId = req.params.eid;

  let event;

  try {
    event = await Event.findById(eventId);
  } catch (err) {
    const error = new Error('Something went wrong, event could not be found!');
    error.code = 500;
    return next(error);
  }

  if (!event) {
    const error = new Error('Event does not exist');
    error.code = 404;
    return next(error);
  } else {
    try {
      await event.remove();
    } catch (err) {
      const error = new Error(
        'Something went wrong, event could not be deleted!'
      );
      error.code = 500;
      return next(error);
    }
  }

  res.json({ message: 'Successfully deleted!' });
};

exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;
exports.editEvent = editEvent;
