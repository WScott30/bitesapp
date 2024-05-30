// src/actions/recipeActions.js
import {
    FETCH_RECIPES_REQUEST,
    FETCH_RECIPES_SUCCESS,
    FETCH_RECIPES_FAILURE,
    FETCH_RECIPE_DETAIL_REQUEST,
    FETCH_RECIPE_DETAIL_SUCCESS,
    FETCH_RECIPE_DETAIL_FAILURE,
    FETCH_FEATURED_RECIPES_REQUEST,
    FETCH_FEATURED_RECIPES_SUCCESS,
    FETCH_FEATURED_RECIPES_FAILURE,

  } from '../actions/actionTypes';  
export const fetchRecipes = () => ({
    type: FETCH_RECIPES_REQUEST,
});

export const fetchRecipesSuccess = (recipes) => ({
    type: FETCH_RECIPES_SUCCESS,
    payload: recipes,
});

export const fetchRecipesFailure = (error) => ({
    type: FETCH_RECIPES_FAILURE,
    payload: error,
});

export const fetchRecipeDetail = (id) => ({
    type: FETCH_RECIPE_DETAIL_REQUEST,
    payload: id,
});

export const fetchRecipeDetailSuccess = (recipe) => ({
    type: FETCH_RECIPE_DETAIL_SUCCESS,
    payload: recipe,
});

export const fetchRecipeDetailFailure = (error) => ({
    type: FETCH_RECIPE_DETAIL_FAILURE,
    payload: error,
});

// Add these if they are not present
export const fetchFeaturedRecipesRequest = () => ({
    type: FETCH_FEATURED_RECIPES_REQUEST,
});

export const fetchFeaturedRecipesSuccess = (recipes) => ({
    type: FETCH_FEATURED_RECIPES_SUCCESS,
    payload: recipes,
});

export const fetchFeaturedRecipesFailure = (error) => ({
    type: FETCH_FEATURED_RECIPES_FAILURE,
    payload: error,
});
