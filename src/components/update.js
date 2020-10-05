import React from 'react';
import {AlertProvider, useAlert} from './alert-provider.js';

export default function Update(props) {
  const updatingImgSrc = 'https://i.ibb.co/bddFczT/small.png';
  const {showAlert} = useAlert();
  console.log(showAlert);

  let nameForClass = 'update';
  if (!props.isLoaded) {
    nameForClass = 'update upd-animation';
  } 

  function handleClick() {
    updateWeather();
  }

  function updateWeather() {
    if (!props.isLoaded) { //double click check 
      showAlert('Loading is in progress already! Please wait.');
      return; 
    }
    props.updateWeather(props.city, props.country);
  }

  return (
    <img
      src={updatingImgSrc}
      style={{height:'20px', width:'20px'}}
      className={nameForClass} 
      alt='update'
      onClick={handleClick}
    />
  )
}