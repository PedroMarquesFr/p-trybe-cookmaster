const recipeServices = require("../services/recipesServices");

const newRecipe = async (req, res) => {
  console.log("recipe: ", req.user, req.body);
  const {_id} = req.user;
  const {name,ingredients, preparation} = req.body;
  const resp = await recipeServices.newRecipe(name,ingredients, preparation,_id);
  res.status(resp.status?resp.status:201).json(resp);
};

module.exports = { newRecipe };
