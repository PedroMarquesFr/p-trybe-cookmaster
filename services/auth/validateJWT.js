const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");

const segredo = "senhasecretashiii";

module.exports = (requireAdmin) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      res.status(401).json({ message: "missing auth token" });
    }

    try {
      const decoded = jwt.verify(token, segredo);
      console.log("decoded: ",decoded);
      if (requireAdmin && !decoded.data.isAdmin) {
        res.status(200).json(400, {
          error: "Acesso negado. Você não tem permissão de admin",
        });
      }

      const user = await userModel.getByEmail(decoded.data.email);

      if (!user) {
        res.status(401).json({ message: "Erro ao procurar usuario do token." });
      }

      req.user = decoded.data;
      next();
    } catch (err) {
      return res.status(401).json({ message: "jwt malformed" });
    }
  };
};
