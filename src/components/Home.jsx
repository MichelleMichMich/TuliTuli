import React from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();
    const handleCatsClick = () => {
        navigate('/cats');
    };

    const handleDogsClick = () => {
        navigate('/dogs');
    };

    const handleGiftsClick = () => {
        navigate('/gifts')
    };

    const handleActionsClick = () => {
        navigate('/actions')
    };

    const handleContactClick = () => {
        navigate('/contact')
    };

    const handleLogoutClick = () => {
        setIsAuthenticated(false);
        navigate('/login');
    }

    return(
        <>
            <h1>Vítejte v TuliTuli </h1>
            <p>Jsme útulek pro kočky a psy.
            <br></br>Můžete nás navštívit, hrát si s námi nebo nám poskytnout nový domov.</p>
            <button onClick={handleCatsClick}>Kočky</button>
            <button onClick={handleDogsClick}>Psi</button>
            <br></br>
            <button onClick={handleGiftsClick}>Dary</button>
            <button onClick={handleActionsClick}>Akce</button>
            <button onClick={handleContactClick}>Kontakt</button>
            <button onClick={handleLogoutClick}>Odhlásit</button>
        </>
    )
}

