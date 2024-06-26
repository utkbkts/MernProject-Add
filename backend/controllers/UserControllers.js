import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../middleware/errorHandler.js";
import sendToken from "../middleware/sendToken.js";
import User from "../models/user.js";

const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 201, res);
});

const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("password does not match", 401));
  }
  sendToken(user, 200, res);
});

const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);
  res.status(200).json({
    user,
  });
});

const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export default {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
