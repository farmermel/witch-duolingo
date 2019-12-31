import React from 'react';
import './App.css';
import { LandingPage } from '../LandingPage/LandingPage';
import { UserHome } from '../UserHome/UserHome'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/user-home">
              <UserHome />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
