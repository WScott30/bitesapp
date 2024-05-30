// src/actions/index.js

// Import individual action creators
import { loginUser } from './authActions';
import { fetchRecipes, fetchRecipeDetail, fetchFeaturedRecipes } from './recipeActions';
// Import other action creators as needed

// Export all action creators as an object
export {
  loginUser,
  fetchRecipes,
  fetchRecipeDetail,
  fetchFeaturedRecipes
  // Add other action creators here
};
