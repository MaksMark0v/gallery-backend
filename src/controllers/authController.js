import {
  changePassword,
  getUserDetailsByEmail,
  loginByCredentials
} from '../repository/authRepo.js';

const authUserDetailsController = async (req, res, next) => {
  try {
    const userDetails = await getUserDetailsByEmail(req.auth.Email);

    if (!userDetails) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  const { userEmail, password } = req.body;
  try {
    const results = await loginByCredentials(userEmail, password);
    if (!results) {
      return res.status(401).json({ message: 'Something went wrong' });
    }

    res.setHeader('Authorization', results.token);

    res.json({
      Id: results.user.Id,
      FirstName: results.user.FirstName,
      LastName: results.user.LastName,
      Email: results.user.Email
    });
  } catch (error) {
    next(error);
  }
};

const changePasswordController = async (req, res, next) => {
  const { currentPassword, newPassword, userEmail } = req.body;

  try {
    const results = await changePassword(
      userEmail,
      currentPassword,
      newPassword
    );

    switch (results) {
      case undefined:
        return res.status(401).json({ message: 'You are not authorized' });

      case false:
        return res.status(403).json({ message: 'Password was wrong' });

      case true:
        res.json({ message: 'Password was changed' });
        break;

      default:
        return res.status(500).json({ message: 'Something went wrong' });
    }
  } catch (error) {
    next(error);
  }
};

export { authUserDetailsController, loginController, changePasswordController };
