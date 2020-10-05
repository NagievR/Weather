import React from 'react';
import '../styles/index.css';

import DateTime from './date-time.js';
import Temperature from './temperature.js';
import OutsideWeater from './outside-weather.js';
import SecondaryInfo from './secondary-info.js';
import Update from './update.js';
import Location from './location/location.js'
import Alert from './alert';

export default function WeatherWidget(props) {
  const data = props.data;

  return (
    <div className='widget'>
      <Location
        changeLocation={props.changeLocation}
        city={data.city} 
        country={data.country} 
      />
      <Update 
        city={data.city} 
        country={data.country} 
        updateWeather={props.updateWeather} 
        isLoaded={data.dataIsLoaded}
        alert={props.alert}
      />
      <DateTime shiftUTC0={data.date} isLoaded={data.dataIsLoaded}/>
      <Temperature temp={data.temp} feels={data.feelsLike} />
      <OutsideWeater iconId={data.iconId} description={data.description} />
      <hr width='90%' size='1' color='#4f4f4f' />
      <SecondaryInfo info={data.secondaryInfo} /> 
      <Alert alert={props.alert} />
    </div>
  );
}

