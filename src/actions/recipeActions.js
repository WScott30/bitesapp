// src/actions/recipeActions.js
import axios from 'axios';

const app_id = process.env.EDAMAM_API_ID || 'ab7f013f'
const app_key = process.env.EDAMAM_API_KEY || '070d8a74d846cf379302b633132b126d'

// Action types for fetching a single recipe detail
export const FETCH_RECIPE_DETAIL_REQUEST = 'FETCH_RECIPE_DETAIL_REQUEST';
export const FETCH_RECIPE_DETAIL_SUCCESS = 'FETCH_RECIPE_DETAIL_SUCCESS';
export const FETCH_RECIPE_DETAIL_FAILURE = 'FETCH_RECIPE_DETAIL_FAILURE';

// Action creator function to fetch recipe detail
export const fetchRecipeDetail = (recipeId, url) => async (dispatch) => {
  dispatch({ type: FETCH_RECIPE_DETAIL_REQUEST });

  try {
    fetch(url)
    .then()

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
    // const response = await axios.get(`https://api.edamam.com/api/recipes/v2`, {
    //   params: {
    //     q: query,
    //     app_id: process.env.REACT_APP_EDAMAM_APP_ID,
    //     app_key: process.env.REACT_APP_EDAMAM_APP_KEY,
    //     type: 'public',
    //   },
    // });

    fetch(`https://api.edamam.com/api/recipes/v2?q=${query}&app_id=${app_id}&app_key=${app_key}&type=public`)
    .then(response => response.json())
    .then(data =>{
      console.log(data);
      dispatch({
        type: FETCH_RECIPES_SUCCESS,
        payload: data.hits,
      });
    })

    
  } catch (error) {
    dispatch({
      type: FETCH_RECIPES_FAILURE,
      payload: error.message,
    });
  }
};
