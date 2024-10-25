import React, { useState } from 'react';
import axios from 'axios';

const FlightSearchForm = () => {
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [hour, setHour] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Para guardar el mensaje de error

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Verifica que los campos no estén vacíos
        if (!departureCity || !arrivalCity || !hour) {
            alert("Please fill in all fields.");
            return; // Detén la ejecución si los campos están vacíos
        }
    
        try {
            // Crear un nuevo objeto Date a partir del valor de hour
            const dateTime = new Date(hour);
            // Convertir a formato ISO y agregar 'Z' al final para indicar UTC
            const formattedHour = dateTime.toISOString(); // Esto convierte a formato ISO 8601
    
            const requestData = {
                searchs: 1,
                qtyPassengers: 2,
                adult: 1,
                itinerary: [
                    {
                        departureCity: departureCity,
                        arrivalCity: arrivalCity,
                        hour: formattedHour, // Asegúrate de que este valor tenga el formato correcto
                    }
                ]
            };
    
            console.log('Request Data:', requestData); // Verifica aquí los datos que se envían
    
            const response = await axios.post('http://127.0.0.1:8000/api/flights', requestData);
            setResults(response.data);
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrorMessage(`Error: ${error.response.data.message || 'Something went wrong'}`);
            } else if (error.request) {
                console.error('Error request:', error.request);
                setErrorMessage('No response from server. Please try again later.');
            } else {
                console.error('General error:', error.message);
                setErrorMessage(`Error: ${error.message}`);
            }
        }
    };
    
    
    

    return (
        <div>
            <h1>Search Flights</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Departure City:
                    <input type="text" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} />
                </label>
                <br />
                <label>
                    Arrival City:
                    <input type="text" value={arrivalCity} onChange={(e) => setArrivalCity(e.target.value)} />
                </label>
                <br />
                <label>
                    Departure Hour:
                    <input type="datetime-local" value={hour} onChange={(e) => setHour(e.target.value)} />
                </label>
                <br />
                <button type="submit">Search Flights</button>
            </form>

            {errorMessage && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    <strong>{errorMessage}</strong>
                </div>
            )}

            {results.length > 0 && (
                <div>
                    <h2>Flight Results</h2>
                    <ul>
                        {results.map((flight, index) => (
                            <li key={index}>
                                {flight.dateOfDeparture} - {flight.timeOfDeparture} | From: {flight.locationId.departureCity} To: {flight.locationId.arrivalCity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FlightSearchForm;
