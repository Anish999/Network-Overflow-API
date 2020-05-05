const mongoose = require('mongoose');
const Address = require('../models/address');

//get Addresses
const getAddresses = async (req, res, next) => {
  let addresses;
  try {
    addresses = await Address.find();
  } catch (err) {
    const error = new Error(
      'Something went wrong! The address could not be found'
    );
    error.code = 500;
    return next(error);
  }
  res.json({
    addresses: addresses.map((Address) => Address.toObject({ getters: true })),
  });
};

//Get Address By Id
const getAddressById = async (req, res, next) => {
  const addressId = req.params.addressid;
  let address;

  try {
    address = await Address.findById(addressId);
  } catch (err) {
    const error = new Error('Something went wrong! Address could not be found');
    error.code = 500;
    return next(error);
  }

  if (!address) {
    const error = new Error('Address not found.');
    error.code = 404;
    return next(error);
  }

  res.json({ address: address.toObject({ getters: true }) });
};

const createAddress = async (req, res, next) => {
  const { street, city, state, zip } = req.body;
  let existingAddress;
  try {
    existingAddress = await Address.findOne({
      street: street,
      city: city,
      state: state,
    });
  } catch (err) {
    const error = new Error('Could not create the address. Try again');
    error.code = 500;
    return next(error);
  }
  if (existingAddress) {
    const message = 'Address already exists';
    return res.json({ message });
  }

  const address = new Address({
    street,
    city,
    state,
    zip,
  });

  try {
    await address.save();
  } catch (err) {
    const error = new Error(
      'Something went wrong, address could not be added!'
    );
    error.code = 500;
    return next(err);
  }

  res.json({ address: address.toObject({ getters: true }) });
};

exports.getAddresses = getAddresses;
exports.getAddressById = getAddressById;
exports.createAddress = createAddress;
