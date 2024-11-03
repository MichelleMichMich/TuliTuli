import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ActionsPage() {

    const [actions, setActions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/actions')
        .then(response => response.json())
        .then(data => setActions(data));
    }, []);

    const navigate = useNavigate();

    const handleHasBeenClick = () => {
        navigate('/actions/hasbeen')
    }

    return(
        <>
            <div className="actions-page">
            <h1>Akce u nás v TuliTuli</h1>
            {/* <button onClick={handleHasBeenClick}>Proběhlo</button> */}
            <div className="actions-offer">
                {actions.map((action) => (
                    <div key={action.id} className="action-card">
                        <img src={action.imageUrl} alt={action.name} className="action-image" />
                        <div className="action-info">
                            <h2>{action.name}</h2>
                            <p>Bude se konat dne: {action.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </>
    )
}