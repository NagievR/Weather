import React from 'react';
import {useState, useContext} from 'react';

const AlertContext = React.createContext(false);
export function useAlert() {
  return useContext(AlertContext);
};

export function AlertProvider({children}) {
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState();

  function showAlert(message) {
    setMessage(message);
    setIsShow(true);
  }
  
  return (
    <AlertContext.Provider value={{
      showAlert,
      settings: {
        isShow: isShow,
        message: message,
        close: setIsShow,
      }
    }}>
      {children}
    </AlertContext.Provider>
  )
}