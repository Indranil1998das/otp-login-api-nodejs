import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: [validator.isEmail, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profilePhoto: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
});

customerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

customerSchema.method("comparePassword", async function (password) {
  return await bcrypt.compareSync(password, this.password);
});

customerSchema.method("createJsonWebToken", (data) => {
  return jsonwebtoken.sign({ id: data._id }, process.env.SECRET_CODE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
});
export default mongoose.model("customer", customerSchema);
