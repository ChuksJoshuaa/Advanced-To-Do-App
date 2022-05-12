import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  message: String,
  category: String,
  name: String,
  creator: {
    type: mongoose.Types.ObjectId,
    require: [true, "Please provide user"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const taskMessage = mongoose.model("taskMessage", taskSchema);

export default taskMessage;
