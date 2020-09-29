import React from 'react';
import CurrentLocation from './current-location';
import ChangeLocationForm from './change-location.js';
import {useState} from 'react';

import '../styles/location.css';

export default function Location(props) {
  const [showForm, setShowForm] = useState(false);
  let currentComponent;

  if (showForm) {
    currentComponent = (
      <ChangeLocationForm  
        changeLocation={props.changeLocation}
        showForm={setShowForm}
      />
    );
  } else {
    currentComponent = (
      <CurrentLocation 
        city={props.city} 
        country={props.country}
        showForm={setShowForm}
      />
    );
  }

  return currentComponent;
}