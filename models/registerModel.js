import mongoose from "mongoose";
const ragisterSchema = new mongoose.Schema({
  customerData: {
    type: Object,
    required: true,
  },
  Otp: {
    type: Number,
    required: true,
  },
});
export default mongoose.model("ragisterRequest", ragisterSchema);
