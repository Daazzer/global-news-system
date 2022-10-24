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
import News from '@/views/News';
import NotFound from '@/views/NotFound';

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
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact={!user} path="/">
          {() => (
            user
              ? <Main />
              : <Redirect to="/login" />
          )}
        </Route>
        <Route path="*">{NotFound}</Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;