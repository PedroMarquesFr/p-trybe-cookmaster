const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const secret = 'senhasecretashiii';

const newLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: 'All fields must be filled' });
    }
    const user = await userModel.getByEmail(email);
    if (!user || user.password !== password || user.email !== email) {
      return res
        .status(401)
        .json({ message: 'Incorrect username or password' });
    }
    const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };
    const { _id, role } = user;
    const token = jwt.sign({ data: { email, _id, role } }, secret, jwtConfig);
    res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = { newLogin };
