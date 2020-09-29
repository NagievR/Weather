import React from 'react';
import {useState, useRef} from 'react';

export default function ChangeLocationForm(props) {
  const cityPlaceholder = 'London';
  const coutryPlaceholder = 'GB'
  const closeBtnText = 'close';
  const findBtnText = 'change';

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [btnValue, setBtnValue] = useState(closeBtnText);
  const lastBtnValue = useRef();
  
  function handleKeyboardEvent(e) {
    if (e.key === 'Enter') {
      const currBtnValue = e.target.closest('form').lastElementChild;
      lastBtnValue.current = currBtnValue.value;
      sendOrOnlyСlose();
    }
  }

  function handleButtonClick(e) {
    lastBtnValue.current = e.target.value;
    sendOrOnlyСlose();
  }

  function handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'city') {
      setCity(value);
      defineButtonText(value);
    } else {
      setCountry(value);
    }
  }
 
  function defineButtonText(value) {
    if (value) {
      setBtnValue(findBtnText); 
    } else {
      setBtnValue(closeBtnText);
    }
  }

  function sendOrOnlyСlose() {
    if (lastBtnValue.current === closeBtnText) { 
      props.showForm(false);
      return;
    }
    props.changeLocation(city.trim(), country.trim());
    props.showForm(false);
    setCity('');
    setCountry('');
    setBtnValue(closeBtnText);
  }

  return (
    <form className='change-location-form' onKeyDown={handleKeyboardEvent}>
      <input 
        autoFocus
        placeholder={cityPlaceholder}
        autoComplete = 'off'
        className = 'city-inp location-input'
        name='city'
        type='text' 
        value={city}
        onChange={handleInputChange}
      />
      <input 
        placeholder={coutryPlaceholder}
        autoComplete = 'off'
        className = 'coutry-inp location-input'
        name='coutry'
        type='text' 
        value={country}
        onChange={handleInputChange}
        maxLength='2'
      />
      <input 
        className='button'
        type='button' 
        onClick={handleButtonClick}
        value={btnValue}
      />
    </form>
  )
}