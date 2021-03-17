const express = require("express");
const { newLogin } = require("./controllers/loginController");
const { createUser } = require("./controllers/userController");
const validateJWT = require("./services/auth/validateJWT");

const router = express.Router();

router.post("/users", createUser);
router.post("/login", newLogin);
router.post("/recipes",validateJWT(false), newLogin);

module.exports = router;
