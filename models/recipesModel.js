const connection = require("./connection");
const { ObjectId } = require('mongodb');

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const result = await connection().then((db) =>
      db.collection("recipes").insertOne({name, ingredients, preparation, userId: ObjectId(userId)})
    );
    console.log(result)
    return { ...result.ops[0] };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

module.exports = { createRecipe };
