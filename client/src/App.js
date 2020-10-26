import React from 'react';
import Portfolio from './components/Portfolio';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import TempLink from './components/Link';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/home">
          <Portfolio />
        </Route>
        <Route path="/link">
          <TempLink />
        </Route>
        <Route path="/">
          <Portfolio />
        </Route>
      </Switch>
    </>
  );
}

export default App;
