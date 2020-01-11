import './App.css';
import { Route, Switch } from 'react-router-dom';
import { LandingPage } from '../LandingPage/LandingPage';
import { Lesson } from '../Lesson/Lesson';
import React from 'react';
import { UserHome } from '../UserHome/UserHome';

export const App = () => (
  <div className="App">
    <header className="App-header">
      <Switch>
        <Route path="/lesson/:id">
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

export default App;
