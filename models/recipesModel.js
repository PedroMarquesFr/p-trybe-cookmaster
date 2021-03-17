const connection = require("./connection");
const { ObjectId } = require("mongodb");

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const result = await connection().then((db) =>
      db
        .collection("recipes")
        .insertOne({ name, ingredients, preparation, userId: ObjectId(userId) })
    );
    return { ...result.ops[0] };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const listRecipes = async () => {
  try {
    const result = await connection().then((db) =>
      db.collection("recipes").find().toArray()
    );
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const listRecipesById = async (id) => {
  try {
    const result = await connection().then((db) =>
      db.collection("recipes").find({_id:ObjectId(id)}).toArray()
    );
    console.log(result[0]);
    return result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { createRecipe, listRecipes, listRecipesById };
