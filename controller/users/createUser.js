const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/Users');

module.exports = async function (req, res, next) {
  const { username, email, password } = req.body;

  //email checking
  try {
    let isEmail = await User.findOne({ email });
    if (isEmail) {
      res.json({ message: 'email already exist' });
    }
  } catch (error) {
    res.json(error);
  }

  let user = new User({
    username,
    email,
    password,
  });

  //hashing
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  //saving and return token
  try {
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_USER_TOKEN,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json(token);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(400).send({ err: 'bad request' });
  }
};
