import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase-client';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export function DogsReservation() {
    const [date, setDate] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [message, setMessage] = useState('');

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
        fetchAvailableTimes(selectedDate);
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

    return(
        <>
            <h1>Rezervace venčení s pejsky</h1>
           
             <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label><strong>Vyberte datum:</strong></label>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                </div>

                {availableTimes.length > 0 && (
                    <div className="form-field">
                        <label><strong>Vyberte čas:</strong></label>
                        <select
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            <option value="">-- Vyberte čas --</option>
                            {availableTimes.map((time, index) => (
                                <option key={index} value={time}>
                                    {time} - {`${parseInt(time.split(':')[0]) + 1}:00`} 
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <Box display="flex" justifyContent="center" alignItems="center" my={2}>
                    <Button variant="contained" type="submit">Rezervovat</Button>
                </Box>
            </form>

            {message && <p>{message}</p>}
        </>
    )
}