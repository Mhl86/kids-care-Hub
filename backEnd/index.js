import express from "express";
import "./db/asociations.js";
import parentRouter from "./routes/parentRoute.js";
import caregiverRouter from "./routes/caregiverRoute.js";
import childrenRouter from "./routes/childrenRoute.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/parents", parentRouter);
app.use("/caregivers", caregiverRouter);
app.use("/children", childrenRouter);

app.use((req, res) => {
  throw new Error("Page not found");
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
