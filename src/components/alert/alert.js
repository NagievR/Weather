import React from 'react';
import {useAlert} from './alert-provider.js';

import closeBtnImg from '../../assets/images/allert-close-button.png'
import '../../styles/alert.css';

export default function Alert() {
  const {settings} = useAlert();

  const show = settings.isShow;
  if (!show) {
    return null;
  }
  
  function closeAlert(event) {
    const targClass = event.target.className;
    if (targClass === 'close-icon' || targClass === 'close-button') {
      settings.close();
    }
  }

  const message = settings.message;

  return (
    <div className='alert-wrapper' onClick={closeAlert}>
      <div className='alert'>
        <div className='header'>
          <button className='close-button' onClick={closeAlert} >
            <img className='close-icon' src={closeBtnImg} alt='close' />
          </button>
        </div>
        <div className='body'>
          <div className='content'>{message}</div> 
        </div>
      </div>
    </div>
  )
}