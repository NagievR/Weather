import React from 'react';
import {useState, useEffect} from 'react';
export default DateTime;

function DateTime(props) {
  const [elemForRender, setElemForRender] = useState('loading...');
  
  useEffect(() => {
    if (!props.isLoaded) {
      return;
    }
    setElemForRender( clockTick(props.shiftUTC0) );
    const timerId = setInterval(() => {
      setElemForRender( clockTick(props.shiftUTC0) );
    }, 1000);

    return () => clearInterval(timerId);
  }, [props.isLoaded, props.shiftUTC0]);
  
  return(
    <div className='thin-small-font' id='date'>{elemForRender}</div>
  );
}

function clockTick(shift) {
  const UTC0Time = setUTC0Time();
  return formateDate( setCityLocalTime(UTC0Time, shift) );
}

function setUTC0Time() {
  const d = new Date();
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth();
  const date = d.getUTCDate();
  const hours = d.getUTCHours();
  const minutes = d.getUTCMinutes();
  const seconds = d.getUTCSeconds();

  return new Date( year, month, 
    date, hours, minutes, seconds );
}

function setCityLocalTime(UTC0, shift) {
  const milisecUTC0 = Number(UTC0);
  const milisecShift = shift * 1000;
  return new Date(milisecUTC0 + milisecShift);
}

function formateDate(d) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const hours = '0'+d.getHours();
  const minutes = '0'+d.getMinutes();
  const seconds = '0'+d.getSeconds();

  return (`${dayName}, ${date} ${month}, ` +
    `${hours.slice(-2)}:${minutes.slice(-2)}:${seconds.slice(-2)}`);
}