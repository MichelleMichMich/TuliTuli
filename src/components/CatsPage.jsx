import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export function CatsPage() {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/cats`)
        .then(response => response.json())
        .then(data => setCats(data));
    }, []);

    const navigate = useNavigate();
    const handleCatReservation = () => {
        navigate('/cats/catsReservation')
    }

    const handleCardClick = (animalType, id) => {
        navigate(`/cats/${id}`);
    }

    return(
        <>
            
            <h1 className="cats-header">Kočičky v TuliTuli</h1>
            <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <Button variant="contained" onClick={handleCatReservation}>Rezervace tulení</Button>
            </Box>
           

            <div className="cats-offer">
                {cats.map((cat) => (
                    <div key={cat.id} className="cat-card" onClick={() => handleCardClick('cats', cat.id)}>
                        <img src={cat.imageUrl} alt={cat.name} className="cat-image" />
                        <div className="cat-info">
                            <h2>{cat.name}</h2>
                            <p>{cat.age}</p>
                        </div>
                    </div>
                ))}
            </div>
        
        </>
    )
}