import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Product Name"],
    maxLength: [50, "must have a maximum of 50 characters"],
  },
  message: {
    type: String,
    required: [true, "Please Enter Product message"],
    maxLength: [500, "must have a maximum of 200 characters"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tags: [String],
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Post", postSchema);
