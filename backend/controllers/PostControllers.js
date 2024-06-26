import catchAsyncError from "../middleware/catchAsyncError.js";
import Post from "../models/post.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import APIFilters from "../utils/APIFilters.js";
import mongoose from "mongoose";
import ErrorHandler from "../middleware/errorHandler.js";
const getAllPosts = catchAsyncError(async (req, res) => {
  const resPerPage = 4;

  const apiFilters = new APIFilters(
    Post.find().populate("user"),
    req.query
  ).searchResult();

  let posts = await apiFilters.query;
  let FilteredProductCount = posts.length;
  apiFilters.pagination(resPerPage);

  posts = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    posts,
    FilteredProductCount,
  });
});

const CreatePost = catchAsyncError(async (req, res) => {
  req.body.user = req.user._id;

  const uploader = async (image) => upload_file(image, "test/posts");
  const urls = await Promise.all(req.body.images.map(uploader));
  req.body.images = urls; // images array'ini urls ile güncelle

  const post = await Post.create(req.body);

  res.status(200).json({
    post,
  });
});
const likedPost = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No post with that id");

    const post = await Post.findById(id);
    if (!post) return res.status(404).send("No post found");

    // Check if the user has already liked the post
    if (post.likedBy.includes(userId))
      return res.status(400).send("You have already liked this post");

    post.likeCount += 1;
    post.likedBy.push(userId);

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const tagPostGet = catchAsyncError(async (req, res) => {
  const { tag } = req.params;

  try {
    const posts = await Post.find({ tags: tag });

    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await Post.findById(req?.params?.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await delete_file(product.images[i].public_id);
  }

  await product.deleteOne();
  res.status(200).json({
    message: "Product Deleted",
  });
});
export default {
  CreatePost,
  tagPostGet,
  getAllPosts,
  likedPost,
  deleteProduct,
};
