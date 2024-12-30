export const pictureSchema = {
  Name: {
    trim: true,
    notEmpty: {
      errorMessage: 'Name must be not empty'
    }
  },
  URL: {
    trim: true,
    isURL: {
      errorMessage: 'URL is not valid'
    }
  },
  Description: { trim: true }
};
