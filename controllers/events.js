const mongoose = require('mongoose');
const Event = require('../models/event');

//Define all the methods here

//get events
const getEvents = async (req, res, next) => {
  //some code
};

//get event by id
const getEventById = async (req, res, next) => {
  //some code
};

//create event
const createEvent = async (req, res, next) => {
  //some code
};

//edit event
const editEvent = async (req, res, next) => {
  //some code
};

//delete event
const deleteEvent = async (req, res, next) => {
  //some code
};

exports.getEvents = getEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;
exports.editEvent = editEvent;
