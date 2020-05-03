const mongoose = require('mongoose');
const Roommate = require('../models/roommate');

//get roommates
const getRoommates = async (req, res, next) => {
  let roommates;
  try {
    roommates = await Roommate.find();
  } catch (err) {
    const error = new Error('Something went wrong! The room listing could not be found');
    error.code = 500;
    return next(error);
  }
  res.json({ rommmates: roommates.map(Roommate => Roommate.toObject({ getters: true })) });
};

//get roommates by id
const getRoommateById = async (req, res, next) => {
  const roommateId = req.params.eid;

  let roommates;

  try {
    roommates = await Roommate.findById(roommateId);
  } catch (err) {
    const error = new Error('Something went wrong! Roommate could not be found');
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
  const { image,listingType, email, firstName, lastName, listingAddress, phoneNumber, summary} = req.body;
  // let existingRoommate;
  // try {
  //   existingRoommate = await Roommate.findOne({ listingAddress: listingAddress });
  // } catch (err) {
  //   const error = new Error('Could not create the room advertisment. Try again');
  //   error.code = 500;
  //   return next(error);
  // }
  // if (existingRoommate) {
  //   const message = 'Room advertisment already exists';
  //   return res.json({ message });
  // }

   const roommate = new Roommate({
    email,
    firstName,
    lastName,
    listingType,
    listingAddress,
    phoneNumber,
    summary,
    image
  });

  try {
    await roommate.save();
    const code = 'Success';
    const message = 'Room listing added successfully';
    return res.json({ code, message });
  } catch (err) {
    const error = new Error('Something went wrong, room advertisment could not be added!');
    error.code = 500;
    return next(err);
  }

//  res.json({ roommate: roommate.toObject({ getters: true }) });
};

//edit or update roommates
const editRoommate = async (req, res, next) => {
  const roommateId = req.body.id;
  const { image, email, firstName, lastName, listingAddress, phoneNumber, summary,listingType } = req.body;
  let roommate;

  try {
    roommate = await Roommate.findById(roommateId);
  } catch (err) {
    const error = new Error('Something went wrong. Could not update room listing.');
    error.code = 500;
    return next(error);
  }

  if (!roommate) {
    const error = new Error('room listing not found.');
    error.code = 404;
    return next(error);
  } else {
    roommate.email = email;
    roommate.firstName = firstName;
    roommate.lastName = lastName;
    roommate.listingAddress = listingAddress;
    roommate.summary = summary;
    roommate.phoneNumber = phoneNumber;
    roommate.listingType= listingType;
    roommate.image = image;

    try {
      await roommate.save();
    } catch (err) {
      const error = new Error('Something went wrong, could not update the room advertisment');
      error.code = 500;
      return next(error);
    }
  }

  res.json({ roommate: roommmate.toObject({ getters: true }) });};

  // delete roommates
const deleteRoommate = async (req, res, next) => {
  const roommateId = req.params.id;

  let roommate;

  try {
    roommate = await Roommate.findById(roommateId);
  } catch (err) {
    const error = new Error('Something went wrong, room listing could not be found!');
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
