import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export function DogsPage() {

    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dogs')
        .then(response => response.json())
        .then(data => setDogs(data));
    }, []);

    const navigate = useNavigate();
    const handleDogReservation = () => {
        navigate('/dogs/dogsReservation')
    }

    const handleCardClick = (animalType, id) => {
        navigate(`/dogs/${id}`);
    }


    return(
        <>
            <h1>Pejsi v TuliTuli</h1>
            <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <Button variant="contained" onClick={handleDogReservation}>Rezervace venčení</Button>
            </Box>

            <div className="dogs-offer">
                {dogs.map((dog) => (
                    <div key={dog.id} className="dog-card" onClick={() =>handleCardClick('dogs', dog.id)}>
                        <img src={dog.imageUrl} alt={dog.name} className="dog-image" />
                        <div className="dog-info">
                            <h2>{dog.name}</h2>
                            <p>{dog.age}</p>
                        </div>
                        {/* <button onClick={handleDogReservation}>Rezervace venčení</button> */}
                    </div>
                ))}
            </div>
        </>
    )
}


    
