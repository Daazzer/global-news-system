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
import NewsDetail from '@/views/News/NewsDetail';
import NotFound from '@/views/NotFound';

const useRoutes = () => {
  const { user } = useSelector(state => state.login);

  const routes = [
    {
      path: '/login',
      component: routeProps => (
        user
          ? <Redirect to="/" />
          : <Login {...routeProps} />
      )
    },
    {
      path: '/news',
      exact: true,
      component: <News />
    },
    {
      path: '/news/:id',
      component: routeProps => <NewsDetail {...routeProps} />
    },
    {
      path: '/',
      exact: !user,
      component: routeProps => (
        user
          ? <Main {...routeProps} />
          : <Redirect to="/login" />
      )
    },
    {
      path: '*',
      component: routeProps => <NotFound {...routeProps} />
    }
  ];

  return routes;
};

function AppRouter() {
  const routes = useRoutes();

  NProgress.start();

  useEffect(() => {
    NProgress.done();
  });

  return (
    <Router>
      <Switch>
        {routes.map(route =>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
          >{route.component}</Route>
        )}
      </Switch>
    </Router>
  );
}

export default AppRouter;