const errMessage = require("./errMessage");
const userModel = require("../models/userModel");

const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const createUser = async (name, email, password, role) => {
  if (!name || !email || !password || !REGEX_EMAIL.test(email))
    return errMessage("Invalid entries. Try again.", 400);

  const userExists = await userModel.getByEmail(email); 
  if(userExists) return errMessage("Email already registered", 409);  
  const isUserCreated = await userModel.createUser(
    name,
    email,
    password,
    role ? role : "user"
  );
  return isUserCreated
    ? isUserCreated
    : errMessage("Internal Problems. Try again.", 400);
};

module.exports = { createUser };
