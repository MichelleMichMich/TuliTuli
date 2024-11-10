import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase-client';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export function CatsReservation() {
    const [date, setDate] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const times = generateTimeSlots();
        setAvailableTimes(times);
    }, []);
   
    const generateTimeSlots = () => {
        const times = [];
        for (let hour = 9; hour < 17; hour++) {
            times.push(`${hour}:00`);
        }
        return times;
    };

  
    const fetchAvailableTimes = async (selectedDate) => {
        try {
            const { data, error } = await supabase
                .from('catsReservation')
                .select('time_from')
                .eq('date', selectedDate);

            if (error) {
                console.error('Chyba při načítání rezervací:', error);
                return;
            }

            if (data) {
                const reservedTimes = data.map((reservation) => reservation.time_from);
                const allTimes = generateTimeSlots();
               
                const filteredTimes = allTimes.filter((time) => !reservedTimes.includes(time));
                setAvailableTimes(filteredTimes);
            }
        } catch (error) {
            console.error('Chyba při načítání dat:', error);
        }
    };

   
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        if (selectedDate) {
            fetchAvailableTimes(selectedDate);
        } else {
            setAvailableTimes(generateTimeSlots());
        }
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date || !selectedTime) {
            setMessage('Prosím vyplňte všechny údaje.');
            return;
        }

        const time_from = selectedTime;
        const time_to = `${parseInt(selectedTime.split(':')[0]) + 1}:00`;

        try {
            const { data, error } = await supabase
                .from('catsReservation')
                .insert([
                    {
                        date: date,
                        time_from: time_from,
                        time_to: time_to,
                    },
                ]);

            if (error) {
                console.error('Chyba při rezervaci:', error);
                setMessage('Rezervace selhala, zkuste to prosím znovu.');
            } else {
                setMessage(`Rezervace úspěšně vytvořena pro datum ${date} od ${time_from} do ${time_to}.`);
                fetchAvailableTimes(date);
                setSelectedTime('');
            }
        } catch (error) {
            console.error('Chyba při rezervaci:', error);
            setMessage('Došlo k chybě, zkuste to prosím znovu.');
        }
    };

    return (
        <>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4} mb={2}>
            <div className='catReservation-page'>
            <h1>Rezervace tulení s kočičkami</h1>
            
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={4} mb={2}>
                        <div className="form-field" style={{ marginBottom: '20px', width: '100%' }}>
                            <label><strong>Vyberte datum:</strong></label>
                            <input
                                type="date"
                                value={date}
                                onChange={handleDateChange}
                                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                            />
                        </div>

                        <div className="form-field" style={{ marginBottom: '20px', width: '100%' }}>
                            <label><strong>Vyberte čas:</strong></label>
                            <select
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                                style={{ width: '100%', padding: '8px', marginTop: '10px' }}
                            >
                                <option value="">-- Vyberte čas --</option>
                                {availableTimes.map((time, index) => (
                                    <option key={index} value={time}>
                                        {time} - {`${parseInt(time.split(':')[0]) + 1}:00`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Button variant="contained" type="submit">Rezervovat</Button>
                    </Box>
                </form>

                {message && <p>{message}</p>}
                </div>
            </Box>
        </>
    );
}