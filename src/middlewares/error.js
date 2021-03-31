const error = async (err, req, res, next) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
};

module.exports = error;
