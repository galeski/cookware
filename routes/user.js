import express from "express";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { createUser, getUserByUsername } from "../queries.js";
import authenticateToken from "../middleware/token.js";

const usersRouter = express.Router();

const saltRounds = 10;

usersRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Minimal Input Validation
  if (!username || !password) {
    console.log(username, password, req.body);
    return res.status(400).json({ error: "Missing required property" });
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const userId = nanoid();

  const recordedUser = getUserByUsername.get(username);

  if (recordedUser)
    return res.status(400).json({ error: "Username already exists" });

  const newUser = createUser.get(userId, username, hashedPassword, Date.now());

  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser.user_id, username: newUser.username },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res.status(201).json({
    userId: newUser.user_id,
    username: newUser.username,
    joined: new Date(newUser.created_at).toISOString(),
    token,
  });
});

// This route is only for illustration. There is no real login implementation
usersRouter.post("/session", async (req, res) => {
  const { username, password } = req.body;

  // Minimal Input Validation
  if (!username || !password) {
    return res.status(400).json({ error: "Missing required property" });
  }

  const registeredUser = getUserByUsername.get(username);
  if (!registeredUser) return res.status(400).json({ error: "User not found" });

  // Check for password
  const isCorrectPassword = await bcrypt.compare(
    password,
    registeredUser.password
  );
  if (!isCorrectPassword) {
    return res.status(400).json({ error: "Incorrect Password" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: registeredUser.user_id, username: registeredUser.username },
    JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res.status(200).json({
    message: "Login Success",
    user: registeredUser.username,
    token,
  });
});

export default usersRouter;
