// src/__tests__/recipeActions.test.js
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../actions/recipeActions';
import * as types from '../actions/actionTypes';
import fetchMock from 'fetch-mock';
import expect from 'expect'; // You can use any testing library
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('recipeActions', () => {
afterEach(() => {
fetchMock.restore();
});
it('creates FETCH_RECIPES_SUCCESS when fetching recipes has been done', () => {
fetchMock.getOnce('/api/recipes?search=chicken', {
body: { foods: [{ food_id: 1, food_name: 'Chicken' }] },
headers: { 'content-type': 'application/json' }
});
const expectedActions = [
{ type: types.FETCH_RECIPES_REQUEST },
{ type: types.FETCH_RECIPES_SUCCESS, payload: [{ food_id: 1, food_name: 'Chicken' }] }
];
const store = mockStore({ recipes: [] });
return store.dispatch(actions.fetchRecipes('chicken')).then(() => {
expect(store.getActions()).toEqual(expectedActions);
});
});
it('creates FETCH_RECIPES_FAILURE when fetching recipes fails', () => {
fetchMock.getOnce('/api/recipes?search=chicken', {
throws: new Error('Network Error')
});
const expectedActions = [
{ type: types.FETCH_RECIPES_REQUEST },
{ type: types.FETCH_RECIPES_FAILURE, payload: 'Network Error' }
];
const store = mockStore({ recipes: [] });
return store.dispatch(actions.fetchRecipes('chicken')).then(() => {
expect(store.getActions()).toEqual(expectedActions);
});
});
});
