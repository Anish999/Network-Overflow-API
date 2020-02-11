const mongoose = require('mongoose');
const Roommate = require('../models/roommate');

//Define all the methods here

//get events
const getRoommates = async (req, res, next) => {
  //some code
};

//get event by id
const getRoommateById = async (req, res, next) => {
  //some code
};

//create event
const createRoommate = async (req, res, next) => {
  //some code
};

//edit event
const editRoommate = async (req, res, next) => {
  //some code
};

//delete event
const deleteRoommate = async (req, res, next) => {
  //some code
};

exports.getRoommates = getRoommates;
exports.getRoommateById = getRoommateById;
exports.createRoommate = createRoommate;
exports.deleteRoommate = deleteRoommate;
exports.editRoommate = editRoommate;
