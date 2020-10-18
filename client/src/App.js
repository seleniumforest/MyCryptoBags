import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [geckoSays, setGeckoSays] = useState({ message: '' });

  useEffect(() => {
    if (isLoaded)
      return;

    axios
      .get('/api/ping')
      .then((response) => {
        console.log(response.data);
        setIsLoaded(true);
        setGeckoSays({ message: response.data.data.gecko_says });
      })
      .catch(err => {
        setIsLoaded(true);
        console.log(err);
      });
  });

  if (!isLoaded)
    return (
      <p>
        Loading
      </p>
    );

  return (
    <p>
      Gecko_says: {geckoSays.message}
    </p>
  );
}

export default App;
