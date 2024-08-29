document.getElementById('fetch-weather-btn').addEventListener('click', fetchWeather);

function fetchWeather() {
    const location = document.getElementById('location-input').value;
    const apiKey = '13215b290c4b456dde64952a345e697f'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('location-name').textContent = 'Error fetching data. Please check the API key or try again.';
            document.getElementById('temperature').textContent = '';
            document.getElementById('conditions').textContent = '';
            document.getElementById('humidity').textContent = '';
            document.getElementById('wind-speed').textContent = '';
        });
}

function displayWeather(data) {
    // Check if data is valid and contains the necessary properties
    if (data && data.cod === 200) {
        document.getElementById('location-name').textContent = `Location: ${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById('conditions').textContent = `Conditions: ${data.weather[0].description}`;
        document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    } else {
        document.getElementById('location-name').textContent = 'Location not found or API error. Please try again.';
        document.getElementById('temperature').textContent = '';
        document.getElementById('conditions').textContent = '';
        document.getElementById('humidity').textContent = '';
        document.getElementById('wind-speed').textContent = '';
    }
}
