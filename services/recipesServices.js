const errMessage = require("./errMessage");
const recipesModel = require("../models/recipesModel");

const newRecipe = async (recipeName, ingredients, preparation, userId) => {
  if (!recipeName || !ingredients || !preparation)
    return errMessage("Invalid entries. Try again.", 400);
  const resp = await recipesModel.createRecipe(
    recipeName,
    ingredients,
    preparation,
    userId
  );
  if (resp) {
    return { recipe: { ...resp } };
  }
  return errMessage("deu pau ai", 400);
};

module.exports = { newRecipe };
