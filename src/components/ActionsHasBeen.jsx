import React, { useState, useEffect } from "react";

export function ActionsHasBeen() {

    const [actions, setActions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/actions/hasbeen')
        .then(response => response.json())
        .then(data => setActions(data));
    }, []);
   
    return(
        <>
            <h1>Akce, které u nás v TuliTuli již proběhly</h1>
           
            <div className="action-last">
                {actions.map((action) => (
                    <div key={action.id} className="action-card">
                        <img src={action.imageUrl} alt={action.name} className="action-image" />
                        <div className="action-info">
                            <h2>{action.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}