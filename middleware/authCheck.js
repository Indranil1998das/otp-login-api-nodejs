import ErrorHandler from "../utils/ErrorHandler.js";
import jsonwebtoken from "jsonwebtoken";
import customerModel from "../models/customerModel.js";
export const authCheck = async (req, res, next) => {
  let token = req.cookies.token;
  if (token === undefined) {
    return next(new ErrorHandler(406, "This token is not exist."));
  } else {
    try {
      const decode = jsonwebtoken.verify(token, process.env.SECRET_CODE);
      const data = await customerModel.findById(decode.id);
      if (!data) {
        return next(new ErrorHandler(404, "User is not found"));
      }
      req.data = data;
      next();
    } catch (error) {
      return next(new ErrorHandler(400, " unsuccessfull verification."));
    }
  }
};
