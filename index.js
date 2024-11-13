import express from "express";
import usersRouter from "./routes/user.js";
import recipesRouter from "./routes/recipes.js";
import cors from "cors";

const PORT = 5500;
const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/recipes", recipesRouter);

// app.use(express.static(`${import.meta.dirname}/frontend`));
app.use(express.static("public"));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
