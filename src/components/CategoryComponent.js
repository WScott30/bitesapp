import React, { useEffect } from 'react';
import { fetchFoodData } from './actions/foodActions'; // Ensure this path is correct

function App() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchFoodData('apple');
                console.log('Received food data:', data);
            } catch (err) {
                console.error('Failed to fetch food data:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Check the console for food data!</h1>
        </div>
    );
}

export default App;
