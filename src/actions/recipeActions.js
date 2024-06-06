// src/actions/recipeActions.js
import axios from 'axios';

// Action types for fetching a single recipe detail
export const FETCH_RECIPE_DETAIL_REQUEST = 'FETCH_RECIPE_DETAIL_REQUEST';
export const FETCH_RECIPE_DETAIL_SUCCESS = 'FETCH_RECIPE_DETAIL_SUCCESS';
export const FETCH_RECIPE_DETAIL_FAILURE = 'FETCH_RECIPE_DETAIL_FAILURE';

// Action creator function to fetch recipe detail
export const fetchRecipeDetail = (recipeId) => async (dispatch) => {
  dispatch({ type: FETCH_RECIPE_DETAIL_REQUEST });

  try {
    const response = await axios.get(`https://api.edamam.com/search`, {
      params: {
        r: recipeId,
        app_id: process.env.REACT_APP_EDAMAM_APP_ID,
        app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
      },
    });

    // Assuming the API returns an array of recipes, and we need the first one
    const recipeDetail = response.data[0];

    dispatch({
      type: FETCH_RECIPE_DETAIL_SUCCESS,
      payload: recipeDetail,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RECIPE_DETAIL_FAILURE,
      payload: error.message,
    });
  }
};

// Action types for fetching multiple recipes
export const FETCH_RECIPES_REQUEST = 'FETCH_RECIPES_REQUEST';
export const FETCH_RECIPES_SUCCESS = 'FETCH_RECIPES_SUCCESS';
export const FETCH_RECIPES_FAILURE = 'FETCH_RECIPES_FAILURE';

// Action creator function to fetch multiple recipes
export const fetchRecipes = (query) => async (dispatch) => {
  dispatch({ type: FETCH_RECIPES_REQUEST });

  try {
    const response = await axios.get(`https://api.edamam.com/search`, {
      params: {
        q: query,
        app_id: process.env.REACT_APP_EDAMAM_APP_ID,
        app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
      },
    });

    dispatch({
      type: FETCH_RECIPES_SUCCESS,
      payload: response.data.hits,
    });
  } catch (error) {
    dispatch({
      type: FETCH_RECIPES_FAILURE,
      payload: error.message,
    });
  }
};
