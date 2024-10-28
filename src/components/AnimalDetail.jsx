import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function AnimalDetail() {

    const { animalType, id } = useParams();
    const [animal, setAnimal] = useState(null);
    

    useEffect(() => {
        fetch(`http://localhost:5000/${animalType}/${id}`)
        .then(response => response.json())
        .then(data => setAnimal(data));
    }, [animalType, id]);

    if (!animal) {
        return <p>Načítání...</p>;
    }

    return(
        <>
        <div className="animal-detail">
            <h1>{animal.name}</h1>
            <p><strong>Věk:</strong> {animal.age}</p>
            <p><strong>Můj příběh:</strong> {animal.story}</p>

            <div className="animal-images">
                {animal.images && animal.images.map((image, index) => (
                    <img key={index} src={image} alt={`${animal.name} ${index + 1}`} className="animal-image"/>
            ))}
            </div>
        </div>
        </>
    )
}