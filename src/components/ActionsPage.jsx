import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabase/supabase-client';
import { AddAction } from "./AddAction";

export function ActionsPage() {

    const [actions, setActions] = useState([]);

    useEffect(() => {
        const fetchActions = async () => {
            try {
                const { data, error } = await supabase
                    .from('actions')
                    .select('*');

                if (error) {
                    console.error('Chyba při načítání akcí:', error);
                } else {
                    setActions(data);
                }
            } catch (error) {
                console.error('Chyba při načítání dat:', error);
            }
        };

        fetchActions();
    }, []);


    const navigate = useNavigate();

   

    return(
        <>
            <div className="add-action-card">
            <div className="actions-page">
            <h1>Akce u nás v TuliTuli</h1>
           
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
            <AddAction></AddAction>
            </div>
            </div>
        </>
    )
}