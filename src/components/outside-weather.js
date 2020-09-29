import React from 'react';

const WEATHER_ICONS_SRC = 'http://openweathermap.org/img/wn/';
const PLACEHOLDER_SRC = 'https://i.ibb.co/QMmS8X9/arrow-big.png';

export default function OutsideWeater(props) {
  let description = props.description;
  let src;
  let updating;

  if (!props.description) {
    src = PLACEHOLDER_SRC;
    updating = 'upd-animation';
    description = 'loading...'
  } else {
    src = createSrc(props.iconId);
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

function createSrc(icon) {
  return WEATHER_ICONS_SRC + icon + '@2x.png';
}