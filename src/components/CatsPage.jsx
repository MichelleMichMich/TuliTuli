import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


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
            <h1>Kočičky v TuliTuli</h1>

            <button onClick={handleCatReservation}>Rezervace tulení</button>
        
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