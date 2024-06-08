// src/components/RecipeDetailComponent.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/RecipeDetailComponent.scss';
import { useLocation } from 'react-router-dom';


const RecipeDetailComponent = () => {
    const { id } = useParams();
    const location = useLocation();
    const recipeURI = location.state;
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState()

    
    const loading = useSelector(state => state.recipe.loading);
    const error = useSelector(state => state.recipe.error);

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
                    {recipe.totalTime !== 0 && <p>{getCookTime(recipe.totalTime)}</p>}
                    <p>{getCalories(recipe.calories)}</p>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailComponent;
