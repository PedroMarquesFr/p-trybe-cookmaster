const recipeServices = require('../services/recipesServices');
const recipesModel = require('../models/recipesModel');

const newRecipe = async (req, res) => {
  console.log('recipe: ', req.user, req.body);
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const resp = await recipeServices.newRecipe(
    name,
    ingredients,
    preparation,
    _id,
  );
  res.status(resp.status ? resp.status : 201).json(resp);
};

const listRecipes = async (req, res) => {
  recipesModel.listRecipes().then((resp) => res.json(resp));
};

const listRecipesById = async (req, res) => {
  const { id } = req.params;
  recipesModel.listRecipesById(id).then((resp) => {
    if (!resp) {
      return res.status(404).json({ message: 'recipe not found' });
    }
    res.json(resp);
  });
};

const editRecipe = async (req, res) => {
  const { _id: userId, role } = req.user;
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;

  const resp = await recipeServices.editRecipe(
    { userId, role },
    { name, ingredients, preparation, id },
  );

  res.status(resp.status ? resp.status : 200).json(resp);
};

const deleteRecipe = async (req, res) => {
  const { _id: userId, role } = req.user;
  const { id } = req.params;

  const resp = await recipeServices.deleteRecipe(
    { userId, role },
    id,
  );

  res.status(resp.status ? resp.status : 204).json(resp);
};

module.exports = { newRecipe, listRecipes, listRecipesById, editRecipe, deleteRecipe };
