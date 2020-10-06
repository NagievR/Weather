import React from 'react';
import {useAlert} from './alert/alert-provider.js';
import updateBtnImg from '../assets/images/update.png';

export default function Update(props) {
  const {showAlert} = useAlert();

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
      src={updateBtnImg}
      style={{height:'20px', width:'20px'}}
      className={nameForClass} 
      alt='update'
      onClick={handleClick}
    />
  )
}