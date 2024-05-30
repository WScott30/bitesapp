// src/components/RecipeDetailComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeDetail } from '../actions/recipeActions';
import '../styles/RecipeDetailComponent.scss';

const RecipeDetailComponent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const recipe = useSelector(state => state.recipe.selectedRecipe);
    const loading = useSelector(state => state.recipe.loading);
    const error = useSelector(state => state.recipe.error);

    useEffect(() => {
        if (id) {
            dispatch(fetchRecipeDetail(id));
        }
    }, [dispatch, id]);

    return (
        <div className="recipe-detail-container">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {recipe && (
                <div className="recipe-detail">
                    <img src={recipe.image_url} alt={recipe.food_name} className="recipe-detail-image" />
                    <h1>{recipe.food_name}</h1>
                    <p>{recipe.food_description}</p>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipeDetailComponent;
