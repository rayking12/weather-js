import API_KEY from './apikey';

const currentUnit = 0; // 0 - Celsius 1 - Fahrenheit

function parseTemp(temp) {
  const parsedTemp = currentUnit === 0 ? Number(temp) - 273.1 : 1.8 * (Number(temp) - 273) + 32;
  return Math.round(parsedTemp * 10) / 10;
}

let locationIcon = document.querySelector('.weather-icon');

function filterData(weatherData) {
  const city = weatherData.name;
  const { country } = weatherData.sys;
  const place = `${city}, ${country}`;
  const icon = weatherData.weather[0].icon;
  locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${ icon }@2x.png">` ;
  const { main: weatherTitle, description: weatherDesc } = weatherData.weather[0];
  const details = weatherData.main;
  const {
    feels_like: feeling,
    humidity,
    pressure,
    temp,
    temp_max: maxTemp,
    temp_min: minTemp,
  } = details;

  return {
    place,
    weatherTitle,
    weatherDesc,
    icon,
    feeling: parseTemp(feeling),
    humidity,
    pressure,
    temp: parseTemp(temp),
    maxTemp: parseTemp(maxTemp),
    minTemp: parseTemp(minTemp),
  };
}

function fillResult({
  place,
  weatherTitle,
  weatherDesc,
  icon,
  feeling,
  humidity,
  pressure,
  temp,
  maxTemp,
  minTemp,
}) {
  const results = [
    { elementId: '#result-temp', value: `${temp}°` },
    { elementId: '#result-place', value: place },
    { elementId: '#result-weather', value: weatherTitle },
    { elementId: '#result-weather-desc', value: weatherDesc },
    { elementId: '#result-feeling', value: `${feeling}°` },
    { elementId: '#result-humidity', value: `${humidity}%` },
    { elementId: '#result-pressure', value: `${pressure}mb` },
    { elementId: '#result-mintemp', value: `${minTemp}°` },
    { elementId: '#result-maxtemp', value: `${maxTemp}°` },
  ];
  // eslint-disable-next-line
  for (const { elementId, value } of results) {
    document.querySelector(elementId).innerText = value;
  }
}

// HTTPS
async function weatherRequest(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
  );
  const data = await response.json();
  return data;
}

export {
  weatherRequest, fillResult, filterData, parseTemp, currentUnit,
};
