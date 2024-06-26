// src/components/DashboardComponent.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../actions/recipeActions';
import SearchComponent from './SearchComponent';
import RecipeListComponent from './RecipeListComponent';
const DashboardComponent = () => {
const dispatch = useDispatch();
useEffect(() => {
    dispatch(fetchRecipes('chicken')); // Fetch default recipes on load
}, []);
return (
<div>
<SearchComponent />
<RecipeListComponent />
</div>
);
};
export default DashboardComponent;