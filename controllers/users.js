const mongoose = require('mongoose');

const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new Error('Something went weong! User could not be found');
    error.code = 500;
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserByEmail = async (req, res, next) => {
  const email = req.params.email;

  let user;

  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error('Something went wrong! User could not be found');
    error.code = 500;
    return next(error);
  }

  if (!user) {
    const error = new Error('User not found.');
    error.code = 404;
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new Error('Something went wrong! User could not be found');
    error.code = 500;
    return next(error);
  }

  if (!user) {
    const error = new Error('User not found.');
    error.code = 404;
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const signUp = async (req, res, next) => {
  const { email, firstName, lastName, password, phoneNumber } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error('Signing up failed, please try again!');
    error.code = 500;
    return next(error);
  }
  if (existingUser) {
    const message = 'User already exists, please login instead';
    return res.json({ message });
  }

  // sign up roles are Users by default
  const role = 'User';

  const user = new User({
    email,
    firstName,
    lastName,
    password,
    role,
    hasPet: true,
    profileImage,
    phoneNumber,
  });

  try {
    await user.save();
  } catch (err) {
    const error = new Error('Something went wrong, user could not be added!');
    error.code = 500;
    return next(err);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const addUser = async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    role,
    profileImage,
    phoneNumber,
  } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new Error('Signing up failed, please try again!');
    error.code = 500;
    return next(error);
  }
  if (existingUser) {
    const code = 'Warning';
    const message = 'User already exists, please login instead';
    return res.json({ code, message });
  }

  // TODO: generate the password
  const password = 'password';

  const user = new User({
    firstName,
    email,
    lastName,
    password,
    role,
    profileImage,
    phoneNumber: '111-111-1111',
  });

  try {
    await user.save();
    const code = 'Success';
    const message = 'Profile updated Successfully!';
    return res.json({ code, message });
  } catch (err) {
    const error = new Error('Something went wrong, user could not be added!');
    error.code = 500;
    return next(err);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const editUser = async (req, res, next) => {
  const userId = req.body.id;
  const {
    email,
    firstName,
    lastName,
    password,
    role,
    hasPet,
    profileImage,
    phoneNumber,
  } = req.body;
  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new Error('Something went wrong. Could not update user.');
    error.code = 500;
    return next(error);
  }

  if (!user) {
    const code = 'Warning';
    const message = 'User not found';
    return res.json({ code, message });
  } else {
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = password;
    user.role = role;
    user.hasPet = hasPet;
    user.profileImage = profileImage;
    user.phoneNumber = phoneNumber;

    try {
      await user.save();
      const code = 'Success';
      const message = 'Profile updated Successfully!';
      return res.json({ code, message });
    } catch (err) {
      const error = new Error('Something went wrong, could not update user');
      error.code = 500;
      return next(error);
    }
  }

  res.json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new Error('Something went wrong, user could not be found!');
    error.code = 500;
    return next(error);
  }

  if (!user) {
    const error = new Error('User does not exist');
    error.code = 404;
    return next(error);
  } else {
    try {
      await user.remove();
    } catch (err) {
      const error = new Error(
        'Something went wrong, user could not be deleted!'
      );
      error.code = 500;
      return next(error);
    }
  }

  res.json({ message: 'Successfully deleted!' });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signUp = signUp;
exports.addUser = addUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.getUserByEmail = getUserByEmail;
