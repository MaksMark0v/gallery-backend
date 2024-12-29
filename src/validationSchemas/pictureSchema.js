export const pictureSchema = {
  Name: {
    trim: true,
    notEmpty: {
      errorMessage: 'Name must be not empty'
    }
  },
  URL: { trim: true },
  Description: { trim: true }
};
