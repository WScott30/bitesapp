// src/components/CarouselComponent.js
import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedRecipes } from '../actions/recipeActions';
import '../styles/CarouselComponent.scss';
const CarouselComponent = () => {
const dispatch = useDispatch();
const featuredRecipes = useSelector(state => state.recipe.featuredRecipes);
const loading = useSelector(state => state.recipe.loading);
const error = useSelector(state => state.recipe.error);
useEffect(() => {
dispatch(fetchFeaturedRecipes()); // Fetch featured recipes on load
}, [dispatch]);
const settings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 3,
slidesToScroll: 1,
};
return (
<div className="carousel-container">
{loading && <p>Loading...</p>}
{error && <p>{error}</p>}
{!loading && !error && (
<Slider {...settings}>
{featuredRecipes.map((recipe, index) => (
<div key={index} className="carousel-item">
<img src={recipe.image_url} alt={recipe.food_name} className="carousel-image" />
<h3>{recipe.food_name}</h3>
</div>
))}
</Slider>
)}
</div>
);
};
export default CarouselComponent;
