// src/__tests__/recipeReducer.test.js
import reducer from '../reducers/recipeReducer';
import * as types from '../actions/actionTypes';
const initialState = {
recipes: [],
featuredRecipes: [],
selectedRecipe: null,
loading: false,
error: null
};
describe('recipeReducer', () => {
it('should return the initial state', () => {
expect(reducer(undefined, {})).toEqual(initialState);
});
it('should handle FETCH_RECIPES_REQUEST', () => {
expect(
reducer(initialState, {
type: types.FETCH_RECIPES_REQUEST
})
).toEqual({
...initialState,
loading: true,
error: null
});
});
it('should handle FETCH_RECIPES_SUCCESS', () => {
expect(
reducer(initialState, {
type: types.FETCH_RECIPES_SUCCESS,
payload: [{ food_id: 1, food_name: 'Chicken' }]
})
).toEqual({
...initialState,
loading: false,
recipes: [{ food_id: 1, food_name: 'Chicken' }]
});
});
it('should handle FETCH_RECIPES_FAILURE', () => {
expect(
reducer(initialState, {
type: types.FETCH_RECIPES_FAILURE,
payload: 'Network Error'
})
).toEqual({
...initialState,
loading: false,
error: 'Network Error'
});
});
});
