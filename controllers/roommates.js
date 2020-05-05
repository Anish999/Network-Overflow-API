const mongoose = require('mongoose');
const Roommate = require('../models/roommate');

//get roommates
const getRoommates = async (req, res, next) => {
  let roommates;
  try {
    roommates = await Roommate.find();
  } catch (err) {
    const error = new Error(
      'Something went wrong! The room listing could not be found'
    );
    error.code = 500;
    return next(error);
  }
  res.json({
    rommmates: roommates.map((Roommate) =>
      Roommate.toObject({ getters: true })
    ),
  });
};

//get roommates by id
const getRoommateById = async (req, res, next) => {
  const roommateId = req.params.eid;

  let roommates;

  try {
    roommates = await Roommate.findById(roommateId);
  } catch (err) {
    const error = new Error(
      'Something went wrong! Roommate could not be found'
    );
    error.code = 500;
    return next(error);
  }

  if (!roommates) {
    const error = new Error('Roommate not found.');
    error.code = 404;
    return next(error);
  }

  res.json({ roommates: roommates.toObject({ getters: true }) });
};

//create roommates
const createRoommate = async (req, res, next) => {
  const {
    image,
    listingType,
    user,
    address,
    contactNumber,
    description,
    petsAllowed,
  } = req.body;

  const roommate = new Roommate({
    user,
    listingType,
    address,
    contactNumber,
    description,
    image,
    datePosted: Date.now(),
    petsAllowed,
  });

  try {
    await roommate.save();
    const code = 'Success';
    const message = 'Room listing added successfully';
    return res.json({ code, message });
  } catch (err) {
    const error = new Error(
      'Something went wrong, room advertisment could not be added!'
    );
    error.code = 500;
    return next(err);
  }
};

//edit or update roommates
const editRoommate = async (req, res, next) => {
  const roommateId = req.body.id;
  const {
    image,
    listingType,
    address,
    contactNumber,
    description,
    petsAllowed,
  } = req.body;
  let roommate;

  try {
    roommate = await Roommate.findById(roommateId);
  } catch (err) {
    const error = new Error(
      'Something went wrong. Could not update room listing.'
    );
    error.code = 500;
    return next(error);
  }

  if (!roommate) {
    const error = new Error('room listing not found.');
    error.code = 404;
    return next(error);
  } else {
    roommate.address = address;
    roommate.description = description;
    roommate.contactNumber = contactNumber;
    roommate.listingType = listingType;
    roommate.image = image;
    roommate.petsAllowed = petsAllowed;
    roommate.datePosted = Date.now();

    try {
      await roommate.save();
    } catch (err) {
      const error = new Error(
        'Something went wrong, could not update the room advertisment'
      );
      error.code = 500;
      return next(error);
    }
  }

  res.json({ roommate: roommmate.toObject({ getters: true }) });
};

// delete roommates
const deleteRoommate = async (req, res, next) => {
  const roommateId = req.params.id;

  let roommate;

  try {
    roommate = await Roommate.findById(roommateId);
  } catch (err) {
    const error = new Error(
      'Something went wrong, room listing could not be found!'
    );
    error.code = 500;
    return next(error);
  }

  if (!roommate) {
    const error = new Error('Room listing does not exist');
    error.code = 404;
    return next(error);
  } else {
    try {
      await roommate.remove();
    } catch (err) {
      const error = new Error(
        'Something went wrong, room listing could not be deleted!'
      );
      error.code = 500;
      return next(error);
    }
  }

  res.json({ message: 'Successfully deleted!' });
};

exports.getRoommates = getRoommates;
exports.getRoommateById = getRoommateById;
exports.createRoommate = createRoommate;
exports.deleteRoommate = deleteRoommate;
exports.editRoommate = editRoommate;
