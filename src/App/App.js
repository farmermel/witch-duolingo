import React, { useEffect } from 'react';
import './App.css';
import { LandingPage } from '../LandingPage/LandingPage';
import { UserHome } from '../UserHome/UserHome';
import { Lesson } from '../Lesson/Lesson';
import { Switch, Route } from 'react-router-dom';

export const App = () => {
  useEffect(() => {

  });
  
  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/lesson">
            <Lesson />
          </Route>
          <Route path="/user-home">
            <UserHome />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </header>
    </div>
  );
};

export default App;
