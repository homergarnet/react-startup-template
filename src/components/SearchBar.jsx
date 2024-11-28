import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState('');

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 3000);

        // Cleanup timeout
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Action on debounced term change
    useEffect(() => {
        if (debouncedTerm) {
            console.log('Search term submitted:', debouncedTerm);
            // Trigger search API or action here
        }
    }, [debouncedTerm]);

    return (
        <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
};

export default SearchBar;