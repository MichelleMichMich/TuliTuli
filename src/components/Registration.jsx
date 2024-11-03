import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase/supabase-client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export function Registration() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [age, setAge] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [message, setMessage] = useState(null);
    
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Hesla se neshodují');
            return;
        }

        if (!validatePassword(password)) {
            alert('Heslo musí mít alespoň 8 znaků, obsahovat jedno velké písmeno, jednu číslici a jeden speciální znak');
            return;
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
            age,
            address: {
                street,
                city,
                postalCode
            }
        };

        try {
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password
            }, {
                data: {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    street: userData.address.street,
                    city: userData.address.city,
                    postalCode: userData.address.postalCode,
                    age: userData.age
                }
            });

            if (error) {
                console.error('Chyba při registraci:', error.message);
                setMessage('Registrace selhala, zkuste to prosím znovu.');
            } else {
                setMessage('Registrace byla úspěšná. Zkontrolujte váš e-mail pro potvrzení účtu.');
                navigate('/login');
            }
        } catch (error) {
            console.error('Chyba při registraci:', error);
            alert('Došlo k chybě, zkuste to prosím znovu');
        }
    };

    return (
        <>
             <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
            <h1>Registrace</h1>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Jméno"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />

                <TextField
                    label="Příjmení"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />

                <TextField
                    label="E-mail"
                    variant="outlined"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="outlined-adornment-password">Heslo</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Heslo"
                    />
                </FormControl>

                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="outlined-adornment-confirm-password">Potvrzení hesla</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Potvrzení hesla"
                    />
                </FormControl>

                <TextField
                    label="Ulice"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                />

                <TextField
                    label="Město"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                />

                <TextField
                    label="Poštovní číslo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                />

                <TextField
                    label="Věk"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Registrovat
                </Button>
            </form>
        </Box>
        </>
    );
}