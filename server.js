import app from "./app.js";
import dotenv from "dotenv";
import { databaseConnection } from "./detabase/databaseConnection.js";
dotenv.config();
app.listen(process.env.PORT, () => {
  console.log(`Server is Running`);
  databaseConnection();
});
