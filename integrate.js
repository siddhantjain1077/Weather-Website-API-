const apiKey = "fMKoSthSWjufVbQaZTe9DSf9aA9N1Ypt"; // Replace with your AccuWeather API key

async function getWeather() {
    const location = document.getElementById("location").value.trim();

    if (!location) {
        alert("Please enter a city name.");
        return;
    }

    try {
        // Step 1: Get Location Key from City Name
        const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${location}`;

        const locationResponse = await fetch(locationUrl);
        const locationData = await locationResponse.json();

        if (!locationData.length) {
            alert("City not found.");
            return;
        }

        const locationKey = locationData[0].Key;
        const cityName = locationData[0].LocalizedName;

        // Step 2: Get Weather Data using Location Key
        const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`;

        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (!weatherData.length) {
            alert("Weather data not found.");
            return;
        }

        const temperature = weatherData[0].Temperature.Metric.Value;
        const description = weatherData[0].WeatherText;
        const humidity = weatherData[0].RelativeHumidity;
        const windSpeed = weatherData[0].Wind.Speed.Metric.Value;

        // Display Data
        document.getElementById("city-name").textContent = cityName;
        document.getElementById("temperature").textContent = `${temperature}°C`;
        document.getElementById("description").textContent = description;
        document.getElementById("details").innerHTML = `Humidity: ${humidity}%, Wind Speed: ${windSpeed} km/h`;

        document.getElementById("weather-info").style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data.");
    } }
// sonaxxi22
// son@xxi22