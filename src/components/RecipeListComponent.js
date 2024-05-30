// src/components/RecipeListComponent.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/RecipeListComponent.scss';
const RecipeListComponent = () => {
const recipes = useSelector(state => state.recipe.recipes);
const loading = useSelector(state => state.recipe.loading);
const error = useSelector(state => state.recipe.error);
return (
<div className="recipe-list-container">
{loading && <p>Loading...</p>}
{error && <p>{error}</p>}
<ul className="recipe-list">
{recipes.map((recipe, index) => (
<li key={index} className="recipe-item">
<Link to={`/recipe/${recipe.food.food_id}`}>
<img src={recipe.food.image_url} alt={recipe.food.food_name} className="recipe-image" />
<h3>{recipe.food.food_name}</h3>
<p>{recipe.food.food_description}</p>
</Link>
</li>
))}
</ul>
</div>
);
};
export default RecipeListComponent;