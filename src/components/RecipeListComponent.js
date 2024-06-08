// src/components/RecipeListComponent.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/RecipeListComponent.scss';
import { returnRecipeID } from '../utils/returnID';


const RecipeListComponent = () => {
  const recipes = useSelector(state => state.recipe.recipes);
  const loading = useSelector(state => state.recipe.loading);
  const error = useSelector(state => state.recipe.error);

  return (
    <div className="recipe-list-container">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => {
            // Check if recipe and its required properties are defined
            if (!recipe.recipe.url) {
              return <li key={index} className="recipe-item">Invalid recipe data</li>;
            }

            return (
              <li key={index} className="recipe-item">
                <Link state={recipe._links.self.href}  key={recipe.recipe.url} to={`/recipe/${returnRecipeID(recipe.recipe.uri)}`} style={{textDecoration: 'none', color: 'black'}} >
                  <img
                    src={recipe.recipe.images.SMALL.url || 'default-image-url.jpg'}
                    alt={recipe.recipe.label || 'No name available'}
                    className="recipe-image"
                  />
                  <h3>{recipe.recipe.label || 'No name available'}</h3>
                  <ul>{recipe.recipe.ingredients.map(i=>(
                    <li>{i.text}</li>
                  ))}</ul>
                </Link>
              </li>
            );
          })
        ) : (
          <p>No recipes found</p>
        )}
      </ul>
    </div>
  );
};

export default RecipeListComponent;
