import express from "express";
import cors from "cors";
import env from "dotenv";
import clientRoutes from "./routes/clientRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
env.config();
const port = process.env.EXPRESS_PORT || 3000;

app.use("/api", clientRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
