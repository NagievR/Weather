import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useRef, useEffect} from 'react';
import WeatherWidget from './components/weather-widget.js'

const API_KEY = 'e8afc68129142e12abe4457ecd337411';
const METRIC_CELSIUS = '&units=metric';
const initialStateOfData = {
  country: null, 
  city: null, 
  temp: null, 
  feelsLike: null, 
  description: null, 
  iconId: null,
  date: null, 
  secondaryInfo: {
    wind: null,
    humidity: null,
    pressure: null,
    visibility: null,
  },
  dataIsLoaded: null,
};

function App() {
  const [data, setData] = useState(initialStateOfData); 
  const previousLocation = useRef(initialStateOfData); 
  const city = useRef('London');
  const country = useRef('GB');

  const [alertIsOpen, setAlertIsOpen] = useState(false);
  const [alertText, setAlertText] = useState();

  useEffect(() => {
    // Show the initial location after the first render only
    doRequest(city.current, country.current);
    // eslint-disable-next-line
  }, []); 

  function doRequest(currCity, currCountry) {
    notifyDataIsLoading();

    getWeather(currCity, currCountry)
      .then (
      weather => {
        previousLocation.current = weather;
        setData(prevWeather => prevWeather = weather);
      },
      error => {
        createAlert(error.message);
        setData(previousLocation.current);
      });
  }

  function handleLocationChange(cityFromInput, countryFromInput) {
    city.current = cityFromInput
    if (countryFromInput) {
      country.current = countryFromInput;
      doRequest(cityFromInput, countryFromInput);
    } else {
      doRequest(cityFromInput);
    }
  }

  function notifyDataIsLoading() {
    let dataCopy = Object.assign({}, data);
    dataCopy.dataIsLoaded = null;
    setData(dataCopy);
  }

  function createAlert(message) {
    setAlertText(message);
    setAlertIsOpen(true);
  }
  const alertSettings = {
    isOpen: alertIsOpen,
    text: alertText,
    set: setAlertIsOpen,
    createAlert: createAlert,
  };

  return (
    <WeatherWidget
      data={data}
      updateWeather={doRequest}
      changeLocation={handleLocationChange}
      alert={alertSettings}
    />
  ) 
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

async function getWeather(city, country = '') {
  let data;
  try {
    console.log(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}${METRIC_CELSIUS}&appid=${API_KEY}`);
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}${METRIC_CELSIUS}&appid=${API_KEY}`);
    data = await response.json();

    if (data.cod >= 400 || !data) {
      throw Error();
    }

  } catch (e) {
    if (!data) {
      throw Error('Request error. Check your connection.');
    } else if (data.cod === '404') { 
      throw Error(`Message from server: "${data.message}".
      You searched for: city - "${city}", country - "${country}" (country isn't necessary).`);
    } else {
      console.log(`${e}. Response code: ${data.cod}. Server message: ${data.message}`);
      throw Error('Unknown error. Try again later.');
    }
  }

  return {
    country: data.sys.country,
    city: data.name,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    description: data.weather[0].description,
    iconId: data.weather[0].icon,
    date: data.timezone,
    secondaryInfo: {
      wind: String(data.wind.speed),
      humidity: String(data.main.humidity),
      pressure: String(data.main.pressure),
      visibility: String(data.visibility),
    },
    dataIsLoaded: Math.random(),
  };
}
