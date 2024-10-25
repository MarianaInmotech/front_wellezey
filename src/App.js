import React, { useState } from 'react';
import FlightSearchForm from './components/FlightSearchForm';

function App() {
    const [flights, setFlights] = useState([]);

    const handleSearch = (searchResults) => {
        setFlights(searchResults);  // Almacenar los resultados obtenidos del backend
    };

    return (
        <div className="App">
            <h1>Flight Search</h1>
            <FlightSearchForm onSearch={handleSearch} />
            <div>
                <h2>Flight Results</h2>
                {flights.length > 0 ? (
                    <ul>
                        {flights.map((flight, index) => (
                            <li key={index}>
                                {flight.locationId.departureCity} to {flight.locationId.arrivalCity} - {flight.flightNumber} ({flight.marketingCarrier})
                                <br />
                                Departure: {flight.timeOfDeparture}, Arrival: {flight.timeOfArrival}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No flights found</p>
                )}
            </div>
        </div>
    );
}

export default App;
