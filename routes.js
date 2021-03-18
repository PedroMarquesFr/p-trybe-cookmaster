const express = require("express");
const multer = require("multer");

const path = require("path");

const { newLogin } = require("./controllers/loginController");
const {
  newRecipe,
  listRecipes,
  listRecipesById,
  editRecipe,
  deleteRecipe,
} = require("./controllers/recipesController");
const { addImage } = require("./models/recipesModel");
const { createUser } = require("./controllers/userController");
const validateJWT = require("./services/auth/validateJWT");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (res, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, req.params.id + ".jpeg");
    // path.extname(file.originalname)
  },
});
const upload = multer({ storage });

router.use("/images", express.static(path.join(__dirname, "uploads")));

router.post("/users", createUser);
router.post("/login", newLogin);

router.post("/recipes", validateJWT(false), newRecipe);
router.get("/recipes", listRecipes);
router.get("/recipes/:id", listRecipesById);
router.put("/recipes/:id", validateJWT(false), editRecipe);
router.delete("/recipes/:id", validateJWT(false), deleteRecipe);
router.put(
  "/recipes/:id/image",
  validateJWT(false),
  upload.single("image"),
  async (req, res, next) => {
    await addImage(req.params.id);
    console.log("ENTROU");
    next();
  },
  listRecipesById
);

module.exports = router;
