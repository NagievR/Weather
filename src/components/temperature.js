import React from 'react';
import '../styles/temperature.css'

export default function Temperature(props) {
  const feelsFormated = Math.round(props.feels);
  const t = formateCurrentTemp(props.temp);
  let metric = (props.temp && props.temp !== 0) ? '°' : '';

  return (
    <div className='temperature-container'>
      <div className='current'>{t}{metric}</div>
      <div className='thin-small-font feels-like'>
        but feels like {feelsFormated}&deg;
      </div>
    </div>
  );
}

function formateCurrentTemp(t) {
  if (!t && t !== 0) {
    return(<span className='loading thin-small-font'>loading...</span>);
  } else if (String(t).includes('-') || t === 0) {
    return Math.round(t);
  } else {
    return `+${Math.round(t)}`;
  }
}
