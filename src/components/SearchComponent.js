// src/components/SearchComponent.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../actions/recipeActions';
import { TextField, Button } from '@mui/material';
import '../styles/SearchComponent.scss';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchRecipes(query));
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <TextField
          label="Search for recipes"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="search-button"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchComponent;
