const apiKey = 'e2807a694973d3af0372c9319f2770b5'; // Replace with your OpenWeatherMap API key

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        updateWeather(data);
        setDynamicBackground(data.weather[0].main);
    } catch (error) {
        document.getElementById('weather-container').innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

function updateWeather(data) {
    const weatherContainer = document.getElementById('weather-container');
    weatherContainer.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function setDynamicBackground(weather) {
    const imageMap = {
        Clear: 'sunny sky',
        Rain: 'rainy day',
        Snow: 'snowy landscape',
        Clouds: 'cloudy sky',
        Thunderstorm: 'thunderstorm',
    };

    const keyword = imageMap[weather] || 'beautiful sky';

    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${keyword}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
}
