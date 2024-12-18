import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import PetsIcon from '@mui/icons-material/Pets';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';


export function Home({ setIsAuthenticated }) {
    const { logout } = useAuth();
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
        logout();
        setIsAuthenticated(false);
        navigate('/login');
    }

    return(
        <>
        <div className="home-page">
            <h1>Vítejte v TuliTuli </h1>
            <p>Jsme útulek pro kočky a psy.
            <br></br>Můžete nás navštívit, hrát si s námi nebo nám poskytnout nový domov.</p>
            <ButtonGroup orientation="vertical" variant="text" aria-label="Vertical button group">
            <Button variant="contained" onClick={handleCatsClick} style={{ padding: '30px 200px', fontSize: '24px' }}>Kočky <span style={{ marginLeft: '10px' }}><PetsIcon /></span> </Button>
            <Button variant="contained" onClick={handleDogsClick} style={{ padding: '30px 200px', fontSize: '24px' }}>Psi <><span style={{ marginLeft: '10px' }}><LocalFireDepartmentIcon/></span> <PetsIcon/></></Button>
            <Button variant="contained" onClick={handleGiftsClick} style={{ padding: '30px 200px', fontSize: '24px' }}>Dary <span style={{ marginLeft: '10px' }}><CardGiftcardIcon /></span></Button>
            <Button variant="contained" onClick={handleActionsClick} style={{ padding: '30px 200px', fontSize: '24px' }}>Akce <span style={{ marginLeft: '10px' }}><FlashOnIcon /></span></Button>
            <Button variant="contained" onClick={handleContactClick} style={{ padding: '30px 200px', fontSize: '24px' }}>Kontakt <span style={{ marginLeft: '10px' }}><ContactPhoneIcon /></span></Button>
            </ButtonGroup>
            </div>
        </>
    )
}

