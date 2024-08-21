module.exports = extractErrorMessage = error => {
  // Check if it's a Mongoose Validation Error
  if (error.name === "ValidationError") {
    // Get the first error message
    const firstErrorMessage = Object.values(error.errors)[0].message;
    return firstErrorMessage; // Return only the first error message
  }

  // Check if it's a MongoDB duplicate key error (E11000)
  if (error.code === 11000) {
    // Handle duplicate key error for email field
    if (error.keyValue && error.keyValue.email) {
      return "This email is already in use.";
    }

    // Default message for other duplicate key errors
    return "Duplicate key error.";
  }

  // For other types of errors (e.g., custom errors with a message)
  if (error.message) {
    return error.message;
  }

  // Default fallback error message
  return "An unexpected error occurred.";
};
