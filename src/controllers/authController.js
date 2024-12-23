import { changePassword, loginByCredentials } from '../repository/authRepo.js';

const authVerifyController = async (req, res) => {
  try {
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

const loginController = async (req, res) => {
  const { userEmail, password } = req.body;
  try {
    const results = await loginByCredentials(userEmail, password);
    if (!results) {
      res.status(401).end();
      return;
    }
    res.setHeader('Authorization', results.token);

    res.send({
      Id: results.user.Id,
      FirstName: results.user.FirstName,
      LastName: results.user.LastName,
      Email: results.user.Email
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

const changePasswordController = async (req, res) => {
  const { newPassword, userEmail } = req.body;

  try {
    await changePassword(userEmail, newPassword);
    res.send({ message: 'Password changed' });
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

export { authVerifyController, loginController, changePasswordController };
