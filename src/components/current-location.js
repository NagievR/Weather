import React from 'react';

export default function CurrentLocation(props) {
  function handleClick() {
    props.showForm(true);
  }

  let currentElement;
  if (!props.city) {
    currentElement = (
      <div style={{height: '41px'}}></div>
    );
  } else {
    currentElement = (
      <div 
        onClick={handleClick}
        className='curr-location'
      >{props.city}, {props.country}</div>
    );
  }

  return currentElement;
}