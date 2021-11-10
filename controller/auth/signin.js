const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');
const User = require('../../model/Users');

async function login(req, res, next) {
  const { credential, password } = req.body;
  try {
    let user = await User.findOne({ email: credential });
    let isMatch = await bycrpt.compare(password, user.password);

    //checking credential
    if (!user) {
      return res
        .status(400)
        .json({ message: [{ message: 'email and password do not match' }] });
    }
    //checking password
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: 'email and password do not match' }] });
    }

    //return token
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_USER_TOKEN,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json(token);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = login;
