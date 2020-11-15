import React from 'react';
import Portfolio from './components/Portfolio';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import Options from './components/Options';
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
          <Options />
        </Route>
        <Route path="/">
          <Portfolio />
        </Route>
      </Switch>
    </>
  );
}

export default App;
