import React from "react";

export function DogsReservation() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleReservationSubmit = () => {
    
        if (selectedDate && selectedTime) {
            alert(`Rezervace byla provedena na ${selectedDate.toLocaleDateString()} v ${selectedTime}`);
        } else {
            alert('Vyplňte prosím všechny údaje.');
        }
    };
    return(
        <>
            <h1>Rezervace venčení s pejsky</h1>
           
            <div>
                <label>Vyberte datum:</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    placeholderText="Vyberte datum"
                />
            </div>
            <div>
                <label>Vyberte čas:</label>
                <input
                    type="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                />
            </div>
            <button onClick={handleReservationSubmit}>Rezervovat</button>
        </>
    )
}