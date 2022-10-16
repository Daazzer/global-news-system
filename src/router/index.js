import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NProgress from 'nprogress';
import Login from '@/views/Login';
import Main from '@/views/Main';

function AppRouter() {
  NProgress.start();

  const { user } = useSelector(state => state.login);

  useEffect(() => {
    NProgress.done();
  });

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {() => (
            user
              ? <Redirect to="/" />
              : <Login />
          )}
        </Route>
        <Route path="/">
          {() => (
            user
              ? <Main />
              : <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;