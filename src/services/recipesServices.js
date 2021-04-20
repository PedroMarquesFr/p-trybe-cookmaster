const errMessage = require('./errMessage');
const recipesModel = require('../models/recipesModel');

const newRecipe = async (recipeName, ingredients, preparation, userId) => {
  if (!recipeName || !ingredients || !preparation) {
    return errMessage('Invalid entries. Try again.', 400);
  }
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
  const a = await recipesModel.listRecipesById( recipeInfo.id );
  if (!a) return errMessage('Id da receita invalido', 401);
  if (userInfo.role === 'admin' || userInfo.userId.toString() === a.userId.toString()) {
    await recipesModel.editRecipesById(
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
      userId: userInfo.userId,
    };
  }
  return errMessage('Nao eh o dono da receita nem o admin', 401);
};

const deleteRecipe = async (userInfo, id) => {
  const doesRecipeWithIdExists = await recipesModel.listRecipesById(id);
  if (!doesRecipeWithIdExists) return errMessage('Id da receita invalido', 401);
  console.log(userInfo.role, userInfo.userId, doesRecipeWithIdExists.userId);
  if (
    userInfo.role === 'admin'
    || userInfo.userId.toString() === doesRecipeWithIdExists.userId.toString()
  ) {
    await recipesModel.deleteRecipesById(id);
    return {
      message: 'deu bom ',
    };
  }
  return errMessage('Nao eh o dono da receita nem o admin', 401);
};

module.exports = { newRecipe, editRecipe, deleteRecipe };
