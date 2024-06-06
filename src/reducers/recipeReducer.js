// src/reducers/recipeReducer.js
import {
  FETCH_RECIPE_DETAIL_REQUEST,
  FETCH_RECIPE_DETAIL_SUCCESS,
  FETCH_RECIPE_DETAIL_FAILURE,
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
} from '../actions/recipeActions';

const initialState = {
  recipes: [],
  recipeDetail: {},
  loading: false,
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
    case FETCH_RECIPE_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        loading: false,
        recipes: action.payload,
      };
    case FETCH_RECIPE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        recipeDetail: action.payload,
      };
    case FETCH_RECIPES_FAILURE:
    case FETCH_RECIPE_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recipeReducer;
