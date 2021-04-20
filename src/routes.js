const express = require('express');

const path = require('path');

const lintFresco = '/recipes/:id';

const { newLogin } = require('./controllers/loginController');
const {
  newRecipe,
  listRecipes,
  listRecipesById,
  editRecipe,
  deleteRecipe,
} = require('./controllers/recipesController');
const { addImage } = require('./models/recipesModel');
const { createUser } = require('./controllers/userController');
const validateJWT = require('./services/auth/validateJWT');
const upload = require('./services/multer/multerSetupRecipeImages');

const router = express.Router();

router.use('/images', express.static(path.join(__dirname, '../uploads')));

router.post('/users', createUser);
router.post('/users/admin', validateJWT(true), createUser);
router.post('/login', newLogin);

router.post('/recipes', validateJWT(false), newRecipe);
router.get('/recipes', listRecipes);
router.get(lintFresco, listRecipesById);
router.put(lintFresco, validateJWT(false), editRecipe);
router.delete(lintFresco, validateJWT(false), deleteRecipe);
router.put(
  '/recipes/:id/image',
  validateJWT(false),
  upload.single('image'),
  async (req, res, next) => {
    await addImage(req.params.id);
    console.log('ENTROU');
    next();
  },
  listRecipesById,
);

module.exports = router;
