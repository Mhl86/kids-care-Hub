const errorHandler = (err, req, res, next) => {
  res.status(404).send({ message: "Page not exisit" });
};
export default errorHandler;
