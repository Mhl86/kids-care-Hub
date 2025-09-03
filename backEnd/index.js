import express from "express";
import "./db/asociations.js";
import parentRouter from "./routes/parentRoute.js";
import caregiverRouter from "./routes/caregiverRoute.js";
import childrenRouter from "./routes/childrenRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoute from "./routes/authRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoute);

app.use("/parents", parentRouter);
app.use("/caregivers", caregiverRouter);
app.use("/children", childrenRouter);

app.use((req, res) => {
  throw new Error("Page not found");
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
