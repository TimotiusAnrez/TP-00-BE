const express = require('express');
const userRoutes = express.Router();
const { check, validationResult } = require('express-validator');
const adminAuth = require('../../middleware/adminAuth');

//! used in mongoose middleware ignored if use sql
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');

//? @GET
//? @ADMIN get all user data to dashboard
//! private for admin
userRoutes.get('/', adminAuth, (req, res, next) => {
  res.send('get all user routes');
});

//? @POST
//? @Signup routes
//? @Public
userRoutes.post(
  '/',
  check('username', 'username must not empty').not().isEmpty(),
  check('password', 'must be 6 character at least')
    .trim(' ')
    .isLength({ min: 6 }),
  check('email', 'email is invalid').isEmail().withMessage(),
  (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    next();
  }
  // async (req, res, next) => {
  //   const UserSchema = new mongoose.Schema({
  //     username: {
  //       type: String,
  //       required: true,
  //     },
  //     email: {
  //       type: String,
  //       required: true,
  //       unique: true,
  //     },
  //     password: {
  //       type: String,
  //       required: true,
  //     },
  //     isAdmin: {
  //       type: Boolean,
  //       default: false,
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   });

  //   const User = new mongoose.model('users', UserSchema);

  //   const { username, email, password } = req.body;

  //   try {
  //     let isEmail = await User.findOne({ email });
  //     if (isEmail) {
  //       res.json({ message: 'email already exist' });
  //     }
  //   } catch (error) {
  //     res.json(error);
  //   }

  //   let user = new User({
  //     username,
  //     email,
  //     password,
  //   });

  //   try {
  //     await user.save();

  //     const payload = {
  //       user: {
  //         id: user.id,
  //       },
  //     };

  //     jwt.sign(
  //       payload,
  //       process.env.JWT_SECRET,
  //       {
  //         expiresIn: 3600,
  //       },
  //       (err, token) => {
  //         if (err) {
  //           throw err;
  //         }
  //         res.json(token);
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     res.status(400).send({ err: 'bad request' });
  //   }
  // }
  //? user registration async function using mongoose returned signed jwt please put in user registration middleware here to call after body sanitized
);

module.exports = userRoutes;
