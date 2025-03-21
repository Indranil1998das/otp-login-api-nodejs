import ex from "express";
import customerRoute from "./route/customerRoutes.js";
import Error from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = ex();
app.use(ex.json());
app.use(cookieParser());
app.use("/api/v1", customerRoute);
app.use(Error);
export default app;
