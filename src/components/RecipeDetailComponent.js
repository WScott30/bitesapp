// src/components/RecipeDetailComponent.js
import React, { useEffect, useState } from 'react';

import '../styles/RecipeDetailComponent.scss';
import { useLocation } from 'react-router-dom';


const RecipeDetailComponent = () => {
    
    const location = useLocation();
    const recipeURI = location.state;
    
    const [recipe, setRecipe] = useState()


    useEffect(() => {
        fetch(recipeURI)
        .then(response => response.json())
        .then(data => {
            console.log(data.recipe);
            setRecipe(data.recipe)
        })
    }, []);

    const getCookTime = (time) => {
        const hours = Math.floor(time / 60);
        const minutes = time % 60;
        return `${hours}h ${minutes}m`;
    }

    const getCalories = (calories) => {
        return Math.floor(calories) + ' calories';
    }

    return (
        <div className="recipe-detail-container">
            
            
            {recipe && (
                <div className="recipe-detail">
                    <img src={recipe.images.REGULAR.url} alt={recipe.food_name} className="recipe-detail-image" />
                    <h1>{recipe.label}</h1>
                    <h3 style={{fontWeight: 'lighter'}}>From: {recipe.source}</h3>
                    {recipe.totalTime !== 0 && <p>{getCookTime(recipe.totalTime)}</p>}
                    <p>{getCalories(recipe.calories)}</p>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ul>
                    <a href={recipe.url}>{recipe.url}</a>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailComponent;
