// src/reducers/index.js
import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import authReducer from './authReducer';
const mainReducer = combineReducers({
recipe: recipeReducer,
auth: authReducer
});
//console.log(rootReducer)
export default mainReducer;