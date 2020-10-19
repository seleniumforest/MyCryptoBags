import React, { useEffect } from 'react';
import axios from 'axios';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

function App(props) {

  const { isLoaded, errorMessage, geckoSays } = useSelector(state => ({
    isLoaded: state.isLoaded,
    errorMessage: state.errorMessage,
    geckoSays: state.geckoSays,
  }), shallowEqual);

  const dispatch = useDispatch();

  if (!isLoaded) {
    axios
      .get('/api/ping')
      .then((response) => {
        dispatch({ type: 'ping', payload: { isLoaded: true, geckoSays: response.data.data.gecko_says, errorMessage: '' } });
      })
      .catch(err => {
        dispatch({ type: 'ping', payload: { isLoaded: true, errorMessage: err.message }});
      });

    return (
      <p>
        Loading
      </p>
    );
  }

  return (
    <p>
      { errorMessage.length > 0 ? errorMessage : `Gecko_says: ${geckoSays}` }
    </p> 
  );
}

export default App;
