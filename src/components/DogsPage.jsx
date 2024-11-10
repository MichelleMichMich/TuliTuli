import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { supabase } from '../supabase/supabase-client';
import { AddDog } from "./AddDog";

export function DogsPage({ isAdmin }) {

    const [dogs, setDogs] = useState([]);

    useEffect(() => {
    const fetchDogs = async () => {
        try {
            const { data, error } = await supabase
                .from('dogs')  
                .select('*'); 

            if (error) {
                console.error('Chyba při načítání psů:', error);
            } else {
                const updatedDogs = data.map(dog => {
                    const { data: urlData } = supabase
                        .storage
                        .from('imagesDogs')
                        .getPublicUrl(`${dog.imageUrl}`);
                    return {
                        ...dog,
                        imageUrl: urlData.publicUrl, 
                    };
                });
                setDogs(updatedDogs);
            }
        } catch (error) {
            console.error('Chyba při načítání dat:', error);
        }
    };

    fetchDogs();
}, []);

    const navigate = useNavigate();
    const handleDogReservation = () => {
        navigate('/dogs/dogsReservation')
    }

    const handleCardClick = (animalType, id) => {
        navigate(`/dogs/${id}`);
    }

    const handleAddNewDog = () => {
        navigate('/dogs/add');
    };


    return(
        <>
        <div className="dogs-page">
            <h1 className="dogs-header">Pejsci v TuliTuli</h1>
            <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <Button variant="contained" onClick={handleDogReservation}>Rezervace venčení</Button>
            </Box>

            {isAdmin && (
                <Box display="flex" justifyContent="center" alignItems="center" my={2}>
                    <Button variant="contained" color="secondary" onClick={handleAddNewDog}>
                        Přidat nového pejska
                    </Button>
                </Box>
            )}

            <div className="dogs-offer">
                {dogs.map((dog) => (
                    <div key={dog.id} className="dog-card" onClick={() =>handleCardClick('dogs', dog.id)}>
                        <img src={dog.imageUrl} alt={dog.name} className="dog-image" />
                        <div className="dog-info">
                            <h2>{dog.name}</h2>
                            <p>{dog.age}</p>
                        </div>
                        </div>
                ))} 
                </div>
                <div className="add-dog-container">
                    <AddDog></AddDog>
            </div>
        </div>
        </>
    )
}


    
