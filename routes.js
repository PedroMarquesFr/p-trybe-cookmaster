const express = require("express");
const { newLogin } = require("./controllers/loginController");
const { newRecipe, listRecipes, listRecipesById, editRecipe, deleteRecipe } = require("./controllers/recipesController");
const { createUser } = require("./controllers/userController");
const validateJWT = require("./services/auth/validateJWT");

const router = express.Router();

router.post("/users", createUser);
router.post("/login", newLogin);

router.post("/recipes", validateJWT(false), newRecipe);
router.get("/recipes", listRecipes);
router.get("/recipes/:id", listRecipesById);
router.put("/recipes/:id", validateJWT(false), editRecipe)
router.delete("/recipes/:id", validateJWT(false), deleteRecipe)

module.exports = router;
