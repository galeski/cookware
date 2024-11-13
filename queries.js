import database from "./model.js";

const createUser = database.prepare(`
  INSERT INTO users (user_id, username, password, created_at)
  VALUES (?, ?, ?, ?)
  RETURNING user_id, username, created_at
`);

const getUserByUsername = database.prepare(`
  SELECT * FROM users WHERE username = ?
`);

const getUserById = database.prepare(`
  SELECT * FROM users WHERE user_id = ?
`);

const createRecipe = database.prepare(`
  INSERT INTO recipes (recipe_id, recipe_owner, title, content, created_at)
  VALUES (?, ?, ?, ?, ?)
  RETURNING recipe_id, title, content, created_at
`);

const getRecipesByUserId = database.prepare(`
  SELECT * FROM recipes WHERE recipe_owner = ?
`);

const getRecipeById = database.prepare(`
  SELECT * FROM recipes WHERE recipe_id = ?
`);

const getRecipesAll = database.prepare(`
  SELECT * FROM recipes
`);

const updateRecipeContentById = database.prepare(`
  UPDATE recipes SET content = ? WHERE recipe_owner = ? AND recipe_id = ? 
  RETURNING recipe_id, title, content, created_at
`);

const deleteRecipe = database.prepare(`
  DELETE from recipes WHERE recipe_id = ? AND recipe_owner = ?
`);

export {
  createUser,
  getUserByUsername,
  getUserById,
  createRecipe,
  getRecipesByUserId,
  getRecipeById,
  getRecipesAll,
  updateRecipeContentById,
  deleteRecipe,
};
