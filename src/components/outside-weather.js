import React from 'react';
import loadingBtnImg from '../assets/images/loading.png';

export default function OutsideWeater(props) {
  const weatherIconsSrc = 'https://openweathermap.org/img/wn/';
  let description = props.description;
  let src;
  let updating;

  if (!props.description) {
    src = loadingBtnImg;
    updating = 'upd-animation';
    description = 'loading...'
  } else {
    src = weatherIconsSrc + props.iconId + '@2x.png';
  }

  return ( 
    <div className='outside-info'>
      <img 
        className={updating} 
        style={{height: '100px', width: '100px'}} 
        src={src} 
        alt={description}
      />
      <div className='outside-description thin-small-font'>
        {description}
      </div>
    </div>
  )
}