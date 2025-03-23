import customerModel from "../models/customerModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { isStrongPassword } from "validator";
import registerModel from "../models/registerModel.js";
import SaveInCookie from "../utils/SaveInCookie.js";
import SendMail from "../utils/SendMail.js";
export const ragisterCustomer = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobileNo,
      country,
      state,
      profilePhoto,
      city,
      street,
      landmark,
      pincode,
    } = req.body;

    console.log(req.body);
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !profilePhoto ||
      !mobileNo ||
      !country ||
      !state ||
      !city ||
      !state ||
      !street ||
      !landmark ||
      !pincode
    ) {
      return next(new ErrorHandler(406, "Please Fill in all Fields."));
    }
    if (mobileNo.toString().length !== 10) {
      return next(
        new ErrorHandler(406, "Please Enter 10 digit mobile Number.")
      );
    }
    let checkdata = await registerModel.findOne({
      "customerData.email": email,
    });
    if (checkdata) {
      return next(
        new ErrorHandler(
          406,
          "This Email Id is already Present in Our database."
        )
      );
    }
    checkdata = await customerModel.findOne({ email: email });
    if (checkdata) {
      return next(
        new ErrorHandler(
          406,
          "This Email Id is already Present in Our database."
        )
      );
    }
    if (!isStrongPassword(password)) {
      return next(
        new ErrorHandler(
          406,
          "Password should contain at least one lowercase letter, one uppercase letter, one number, one special character, and have a minimum length of 8 characters."
        )
      );
    }
    const myCloud = await cloudinary.v2.uploader.upload(profilePhoto, {
      folder: "Maink_application_Photo",
      width: 150,
      quality: "auto",
      crop: "scale",
    });

    const generateOTP = async () => {
      return Math.floor(100000 + Math.random() * 900000);
    };
    const Otp = await generateOTP();
    await registerModel.create({
      customerData: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobileNo: mobileNo,
        profilePhoto: {
          public_id: myCloud.public_id,
          url: myCloud.url,
        },
        country: country,
        city: city,
        state: state,
        street: street,
        pincode: pincode,
        landmark: landmark,
      },
      Otp: Otp,
    });

    const message = `Your OTP is ${Otp}. Please verify your account.`;
    await SendMail(email, message);
    res.status(200).json({
      success: true,
      message:
        "OTP has been successfully sent to the provided email. Please verify your account.  ",
    });
  } catch (error) {
    return next(new ErrorHandler(error));
  }
};

export const verification = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const data = await registerModel.findOne({ "customerData.email": email });
    if (!data) {
      return next(new ErrorHandler(404, "This Email id is not found."));
    }
    if (otp.toString() !== data.Otp.toString()) {
      return next(
        new ErrorHandler(400, "OTP does not match. Please try again.")
      );
    } else {
      req.data = data.customerData;
      next();
      await registerModel.findByIdAndDelete(data._id);
    }
  } catch (error) {
    return next(new ErrorHandler(error));
  }
};

export const createCustomerAccount = async (req, res, next) => {
  try {
    const customerData = req.data;
    const data = await customerModel.create(customerData);
    SaveInCookie(data, res, 200);
  } catch (error) {
    return next(new ErrorHandler(error));
  }
};

export const customerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await customerModel
      .findOne({ email: email })
      .select("+password");
    if (!data) {
      return next(new ErrorHandler(404, "This Email id is not found."));
    }
    const passwordCheck = await data.comparePassword(password);
    if (!passwordCheck) {
      return next(new ErrorHandler(406, "This password does not metch."));
    }
    SaveInCookie(data, res, 200);
  } catch (error) {
    return next(new ErrorHandler(error));
  }
};

export const customerLogout = async (req, res, next) => {
  try {
    const option = {
      expires: new Date(Date.now()),
      httpOnly: true,
    };
    return res.status(202).cookie("token", null, option).json({
      success: true,
      message: "Logout succussfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error));
  }
};

export const loggedCustomer = async (req, res, next) => {
  try {
    const data = req.data;
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return next(new ErrorHandler(error));
  }
};
