import ex from "express";
import {
  ragisterCustomer,
  verification,
  createCustomerAccount,
  customerLogin,
  customerLogout,
  loggedCustomer,
} from "../controllers/customerController.js";
import { authCheck } from "../middleware/authCheck.js";
const customerRoute = ex.Router();
customerRoute.route("/ragister-customer").post(ragisterCustomer);
customerRoute.route("/verification").post(verification, createCustomerAccount);
customerRoute.route("/login-customer").post(customerLogin);
customerRoute.route("/logout-customer").put(customerLogout);
customerRoute.route("/logged-customer").get(authCheck, loggedCustomer);
export default customerRoute;
