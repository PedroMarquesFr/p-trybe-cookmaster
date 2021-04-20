const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  try {
    const result = await connection().then((db) =>
      db
        .collection('recipes')
        .insertOne({ name, ingredients, preparation, userId: ObjectId(userId) }));
    return { ...result.ops[0] };
  } catch (err) {
    console.error(err);
    return { err };
  }
};

const listRecipes = async () => {
  try {
    const result = await connection().then((db) =>
      db.collection('recipes').find().toArray());
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
      db
        .collection('recipes')
        .find({ _id: ObjectId(id) })
        .toArray());
    console.log(result[0]);
    return result[0];
  } catch (err) {
    console.error(err);
    return null;
  }
};

const editRecipesById = async (name, ingredients, preparation, id) => {
  try {
    const result = await connection().then((db) =>
      db
        .collection('recipes')
        .updateOne(
          { _id: ObjectId(id) },
          { $set: { name, ingredients, preparation } },
        ));
    console.log('result', result);
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const deleteRecipesById = async (id) => {
  try {
    const result = await connection().then((db) =>
      db.collection('recipes').deleteOne({ _id: ObjectId(id) }));
    console.log('result', result);
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const addImage = async (id) => {
  try {
    const result = await connection().then((db) =>
      db
        .collection('recipes')
        .updateOne(
          { _id: ObjectId(id) },
          { $set: { image: `localhost:3000/images/${id}.jpeg` } },
        ));
    console.log('result', result);
    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  createRecipe,
  listRecipes,
  listRecipesById,
  editRecipesById,
  deleteRecipesById,
  addImage,
};
