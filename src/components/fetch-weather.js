import React from 'react';
import {useState, useRef, useEffect} from 'react';

import Widget from './widget.js'
import {useAlert} from './alert/alert-provider.js';

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

export function FetchWeather() {
  const [data, setData] = useState(initialStateOfData); 
  const previousLocation = useRef(initialStateOfData); 
  const city = useRef('London');
  const country = useRef('GB');
  const {showAlert} = useAlert();

  useEffect(() => {
    // Show the initial location after the first render only
    doRequest(city.current, country.current);
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
        showAlert(error.message);
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

  return (
    <Widget
      data={data}
      updateWeather={doRequest}
      changeLocation={handleLocationChange}
    />
  ) 
}

async function getWeather(city, country = '') {
  let data;
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}${METRIC_CELSIUS}&appid=${API_KEY}`);
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