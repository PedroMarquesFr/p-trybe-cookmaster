const userService = require('../services/userServices');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  if (req.path.split('/').includes('admin')) { role = 'admin'; }
  const resp = await userService.createUser(name, email, password, role);
  console.log();
  res.status(resp.status ? resp.status : 201).json(
    resp.status
      ? resp
      : {
          user: resp,
        },
  );
};

module.exports = { createUser };
