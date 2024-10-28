import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'
import { supabase } from '../supabase/supabase-client';

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

    const [message, setMessage] = useState(null);
    
    const navigate = useNavigate();

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
            <h2>Registrace</h2>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Jméno</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Příjmení</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Heslo</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Potvrzení hesla</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>

                <hr />

                <div className="form-field">
                    <label>Ulice</label>
                    <input
                        type="text"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Město</label>
                    <input
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Poštovní číslo</label>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                    />
                </div>

                <div className="form-field">
                    <label>Věk</label>
                    <input
                        type="text"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </div>

                <button type="submit">Registrovat</button>
            </form>
        </>
    );
}