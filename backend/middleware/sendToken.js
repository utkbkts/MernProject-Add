export default (user, statusCode, res) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // secure flag sadece https üzerinden çalışır
    sameSite: "lax", // CSRF saldırılarını önlemek için sameSite flag
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
