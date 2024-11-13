import express from "express";
import { nanoid } from "nanoid";
import unixToIso from "../helpers/dateHelpers.js";
import {
  getUserById,
  createRecipe,
  getRecipesAll,
  getRecipeById,
  getRecipesByUserId,
} from "../queries.js";

const recipesRouter = express.Router();

// Post new recipe
// TODO: add auth
recipesRouter.post("/", (req, res) => {
  const { title, content, user } = req.body;

  if (!title) return res.status(400).json({ error: "Missing recipe title." });
  if (!content)
    return res.status(400).json({ error: "Missing recipe content" });

  const requestUser = getUserById.get(user);
  if (!requestUser)
    return res.status(400).json({ error: "User doesn't exist" });

  const recipeId = nanoid(6);
  const recipeOwner = requestUser.user_id;
  const createdAt = Date.now();
  const createdAtIso = unixToIso(createdAt);
  const recipeRes = createRecipe.get(
    recipeId,
    recipeOwner,
    title,
    content,
    createdAt
  );

  return res.status(201).json({
    recipeId,
    title,
    createdAtIso,
  });
});

// // Get all recipes, without filtering
// recipesRouter.get("/", (req, res) => {
//   const { id } = req.body;
//   const recipes = getRecipeById.get(id);

//   if (!recipes.length) {
//     return res.status(404).json({ error: "No recipes found." });
//   }

//   return res.status(200).json(recipes);
// });

// Get all recipes, without filtering
recipesRouter.get("/", (req, res) => {
  const recipes = getRecipesAll.all();

  if (!recipes.length) {
    return res.status(404).json({ error: "No recipes found." });
  }

  return res.status(200).json(recipes);
});

export default recipesRouter;
