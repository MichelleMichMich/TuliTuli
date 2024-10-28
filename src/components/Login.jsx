import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({setIsAuthenticated}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (email === "user@user.cz" && password === "user123") {
            setIsAuthenticated(true);
            navigate('/');
        } else {
            alert('Nesprávný e-mail nebo heslo');
        }
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