import React from 'react';
import ReactDOM from 'react-dom';

import {FetchWeather} from './components/fetch-weather.js'
import {AlertProvider} from './components/alert/alert-provider.js';

ReactDOM.render(
  <React.StrictMode>
   <AlertProvider>
      <FetchWeather />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);