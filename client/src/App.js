import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import AccountVerify from './components/AccountVerify/AccountVerify';
import { getLoggedInUser } from './actions/auth';
import CoursesList from './pages/CoursesList/CoursesList';
import UserAccount from './pages/UserAccount/UserAccount';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './routes/PrivateRoute';

const App = () => {
  useEffect(() => {
    store.dispatch(getLoggedInUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route
              exact
              path="/api/v1/auth/accountverification/:id"
              component={AccountVerify}
            />
            <Route exact path="/forgetpassword" component={ForgetPassword} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/courselist" component={CoursesList} />
            <PrivateRoute exact path="/useraccount" component={UserAccount} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
