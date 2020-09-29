import React from 'react';
import '../styles/secondary-info.css';

const metrics = {
  humidity: '%',
  pressure: `bar`,
  wind: 'm/s',
  visibility: 'km',
};

export default function SecondaryInfo(props) {
  let data = validateData(props.info); 

  // converting the values if its necessary
  let visibility = convertVisibility(data.visibility);
  let wind = formateWind(data.wind);
  let pressure = convertPressure(data.pressure);
  let humidity = data.humidity ? data.humidity : null;

  return (
    <div className='secondary-info-container'>
      <InfoBlock info={ ['pressure', pressure] } /> 
      <InfoBlock info={ ['visibility', visibility] } />
      <InfoBlock info={ ['wind', wind] } />
      <InfoBlock info={ ['humidity', humidity] } />
    </div>
  );
}

function InfoBlock(props) { 
  let [name, value] = props.info;
  if (!value) {
    value = <span className='loading thin-small-font'>loading...</span>
    name = '';
  }
  return (
    <div className={name}>
      <div className='name thin-small-font'>{name}</div>
      <div className='wrapper'>
        <div className='value'>{value}</div>
        <div className='metric'>{metrics[name]}</div>
      </div>
    </div>
  );
}

function validateData(obj) {
  const validatedData = {};

  for (let k in obj) {
    const value = obj[k];

    if (!isNaN(value) && value !== '') {
      validatedData[k] = value;
    } else {
      console.warn(`Some problem with: "${k}".\nIt's value is: "${value}".`);
      validatedData[k] = null;
    }
  }
  return validatedData;
}

function convertVisibility (value) { // m to km
  return value ? String((value / 1000).toFixed(1)) : null;
}

function formateWind(value) {
  return value ? (+value).toFixed(0) : null;
}

function convertPressure(value) { // mmHg to bar
  return value ? (value / 750).toFixed(2) : null;
}