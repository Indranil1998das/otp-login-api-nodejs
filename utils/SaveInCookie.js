const SaveInCookie = (data, res, statusCode) => {
  const token = data.createJsonWebToken(data);
  const option = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, option).json({
    success: true,
    data,
  });
};

export default SaveInCookie;
