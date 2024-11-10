import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Home as HomeIcon } from '@mui/icons-material';
import { Pets as PetsIcon } from '@mui/icons-material';
import { CardGiftcard as CardGiftcardIcon } from '@mui/icons-material';
import { ContactPhone as ContactPhoneIcon } from '@mui/icons-material';
import { FlashOn as FlashOnIcon } from '@mui/icons-material';
import { LocalFireDepartment } from '@mui/icons-material';
   

export function NavBar({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const { logout } = useAuth();

 
    const handleLogoutClick = () => {
        logout();
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
<AppBar position="fixed" color="default" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
<Toolbar>
    <ButtonGroup variant="text" aria-label="Basic button group">
        <Button onClick={() => navigate('/')} startIcon={<HomeIcon />} />
        <Button onClick={() => navigate('/cats')} startIcon={<PetsIcon />} />
        <Button onClick={() => navigate('/dogs')} startIcon={<><LocalFireDepartment /> <PetsIcon /></>} />
        <Button onClick={() => navigate('/gifts')} startIcon={<CardGiftcardIcon />} />
        <Button onClick={() => navigate('/actions')} startIcon={<FlashOnIcon />} />
        <Button onClick={() => navigate('/contact')} startIcon={<ContactPhoneIcon />} />
    </ButtonGroup>
    <Button variant="outlined" onClick={handleLogoutClick} style={{ marginLeft: 'auto' }}>Odhlásit</Button>
</Toolbar>
</AppBar>
    );
}