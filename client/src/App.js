import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
