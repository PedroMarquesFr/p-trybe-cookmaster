const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel');

const segredo = 'senhasecretashiii';

module.exports = (requireAdmin) => async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) { res.status(401).json({ message: 'missing auth token' }); }
    try {
      const decoded = jwt.verify(token, segredo);
      console.log('decoded: ', decoded, (decoded.data.role !== 'admin'), requireAdmin);
      if (requireAdmin && decoded.data.role !== 'admin') {
        console.log('entrou');
        return res.status(403).json({
          message: 'Only admins can register new admins',
        });
      }
      const user = await userModel.getByEmail(decoded.data.email);
      if (!user) { res.status(401).json({ message: 'Erro ao procurar usuario do token.' }); }
      req.user = decoded.data;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
  };
