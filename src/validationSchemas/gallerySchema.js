export const gallerySchema = {
  Name: {
    trim: true,
    notEmpty: {
      errorMessage: 'Name must be not empty'
    }
  }
};
