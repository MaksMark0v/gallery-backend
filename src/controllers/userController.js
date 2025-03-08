import {
  getUsersData,
  getUserDetails,
  saveUser,
  deleteUser
} from '../repository/userRepo.js';

const UsersDataController = async (req, res, next) => {
  try {
    const usersData = await getUsersData(req.query);
    res.json(usersData);
  } catch (error) {
    next(error);
  }
};

const userDetailsController = async (req, res, next) => {
  try {
    const userDetails = await getUserDetails(req.params.id);

    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};

const createUserController = async (req, res, next) => {
  const newUser = req.body;
  try {
    const Id = await saveUser(newUser);
    res.send({ Id });
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  const userData = req.body;
  try {
    const Id = await saveUser(userData, req.params.id);

    res.json({ Id });
  } catch (error) {
    next(error);
  }
};

const deleteUserController = async (req, res, next) => {
  try {const userId = req.auth.userId;
    console.log(1, userId);
    await deleteUser(userId);    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export {
  userDetailsController,
  UsersDataController,
  createUserController,
  updateUserController,
  deleteUserController
};
