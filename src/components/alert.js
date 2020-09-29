import React from 'react';
import '../styles/alert.css';

export default function Alert(props) {
  const closeButtonSrc = 'https://i.ibb.co/V2fTC1Q/allert-close-button.png';

  const show = props.alert.isOpen;
  if (!show) {
    return null;
  }

  const message = props.alert.text;
  const closeAlertFunc = props.alert.set;

  function closeAlert(event) {
    const targClass = event.target.className;
    if ( targClass === 'close-icon' 
      || targClass === 'close-button' 
      /*|| targClass === 'alert-wrapper'*/ ) {
      closeAlertFunc(false);
    }
  }

  return (
    <div className='alert-wrapper' onClick={closeAlert}>
      <div className='alert'>
        <div className='header'>
          <button className='close-button' onClick={closeAlert} >
            <img className='close-icon' src={closeButtonSrc} alt='close' />
          </button>
        </div>
        <div className='body'>
          <div className='content'>{message}</div> 
        </div>
      </div>
    </div>
  )
}