import { validationResult } from 'express-validator';

const bodyValidate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = {};
    errors.array().map((err) => (message[err.path] = err.msg));
    return res.status(422).json({ message });
  }
  next();
};
export default bodyValidate;
