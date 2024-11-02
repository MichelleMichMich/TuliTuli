import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../supabase/supabase-client';
import { useAuth } from '../context/AuthProvider';

export function Login({setIsAuthenticated}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isAuth } = useAuth();
    const navigate = useNavigate();

    const handleLoginClick =  async (e) => {
        e.preventDefault()
        console.log('Přihlašuji....', email, password)
        try {
            await login(email, password);
            if (isAuth) {
              setIsAuthenticated(true);
              navigate('/');
              console.log("Heslo ověřeno")
            } else {
              alert('Nesprávný e-mail nebo heslo');
            }
          } catch (error) {
            console.error('Přihlášení selhalo:', error);
            alert('Došlo k chybě při přihlášení');
          }
        // login(email, password);
        
    };

    const handleRegistrationClick = () => {
        navigate('/registration')
    }

    return (
        <div>
            <h2>Přihlášení</h2>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLoginClick}>Přihlásit se</button>
            <br></br>
            <button onClick={handleRegistrationClick}>Registrovat se</button>
        </div>
    );
}