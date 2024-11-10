import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { supabase } from '../supabase/supabase-client';
import { AddCat } from "./AddCat";


export function CatsPage({ isAdmin }) {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const fetchCats = async () => {
            try {
                const { data, error } = await supabase
                    .from('cats')  
                    .select('*'); 

                if (error) {
                    console.error('Chyba při načítání koček:', error);
                } else {
                    const updatedCats = data.map((cat) => {
                        const { data: urlData } = supabase
                            .storage
                            .from('imageCats')
                            .getPublicUrl(`${cat.imageUrl}`);
                        return {
                            ...cat,
                            imageUrl: urlData.publicUrl, 
                        };
                    });
                    setCats(updatedCats);
                }
            } catch (error) {
                console.error('Chyba při načítání dat:', error);
            }
        };

        fetchCats();
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
            <div className="cats-page">
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
                <div className="add-cat-container">
                    <AddCat></AddCat>
            </div>
        </div>
        </>
    )
}