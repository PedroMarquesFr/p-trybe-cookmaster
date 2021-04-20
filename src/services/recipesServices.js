const errMessage = require('./errMessage');
const recipesModel = require('../models/recipesModel');

const newRecipe = async (recipeName, ingredients, preparation, userId) => {
  if (!recipeName || !ingredients || !preparation) return errMessage('Invalid entries. Try again.', 400);
  const resp = await recipesModel.createRecipe(
    recipeName,
    ingredients,
    preparation,
    userId,
  );
  if (resp) {
    return { recipe: { ...resp } };
  }
  return errMessage('deu pau ai', 400);
};

const editRecipe = async (userInfo, recipeInfo) => {
  const doesRecipeWithIdExists = await recipesModel.listRecipesById(
    recipeInfo.id,
  );
  if (!doesRecipeWithIdExists) return errMessage('Id da receita invalido', 401);
  console.log(userInfo.role, userInfo._id, doesRecipeWithIdExists.userId);
  if (
    userInfo.role === 'admin'
    || userInfo._id.toString() === doesRecipeWithIdExists.userId.toString()
  ) {
    const editedRecipe = await recipesModel.editRecipesById(
      recipeInfo.name,
      recipeInfo.ingredients,
      recipeInfo.preparation,
      recipeInfo.id,
    );
    return {
      name: recipeInfo.name,
      ingredients: recipeInfo.ingredients,
      preparation: recipeInfo.preparation,
      _id: recipeInfo.id,
      userId: userInfo._id,
    };
  }
  return errMessage('Nao eh o dono da receita nem o admin', 401);
};

const deleteRecipe = async (userInfo, id) => {
  const doesRecipeWithIdExists = await recipesModel.listRecipesById(id);
  if (!doesRecipeWithIdExists) return errMessage('Id da receita invalido', 401);
  console.log(userInfo.role, userInfo._id, doesRecipeWithIdExists.userId);
  if (
    userInfo.role === 'admin'
    || userInfo._id.toString() === doesRecipeWithIdExists.userId.toString()
  ) {
    await recipesModel.deleteRecipesById(id);
    return {
      message: 'deu bom ',
    };
  }
  return errMessage('Nao eh o dono da receita nem o admin', 401);
};

module.exports = { newRecipe, editRecipe, deleteRecipe };
