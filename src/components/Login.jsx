import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase-client';
import { useAuth } from '../context/AuthProvider';

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

export function Login({setIsAuthenticated}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    
    const { login, isAuth } = useAuth();
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
      setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
};

    const handleLoginClick =  async (e) => {
        e.preventDefault()
        console.log('Přihlašuji....', email)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Přihlášení selhalo:', error.message);
                alert('Nesprávný e-mail nebo heslo');
            } else {
                setIsAuthenticated(true);
                const userData = data.user;
                
                const isAdmin = userData.app_metadata?.is_claims_admin || false;
                setIsAdmin(isAdmin);

                navigate('/');
            }
        } catch (error) {
            console.error('Přihlášení selhalo:', error);
            alert('Došlo k chybě při přihlášení');
        }
    };

    const handleRegistrationClick = () => {
        navigate('/registration')
    }

    return (            
          <Box sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
            <h1>Přihlášení</h1>

            <form onSubmit={handleLoginClick}>
                <TextField
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                      style: { backgroundColor: 'white' }
                    }}
                />

                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="outlined-adornment-password">Heslo</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        inputProps={{
                          style: { backgroundColor: 'white' }
                      }}
                    />
                </FormControl>

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Přihlásit se</Button>

                <Button onClick={handleRegistrationClick} variant="outlined" fullWidth sx={{ mt: 2 }}>Registrovat se</Button>
            </form>
        </Box>      
    );
}