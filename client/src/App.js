import React from 'react';
import axios from 'axios';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import Portfolio from './components/Portfolio';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <>
      <Portfolio />
    </>
  );
}

export default App;
