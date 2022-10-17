import { useEffect, useMemo, useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import Home from '@/views/Main/Home';
import style from './index.module.scss';
import { getAssembleTree } from '@/utils';

const { Content } = Layout;

const getRoutes = tree => {
  const fn = (tree, paths = [], routes = []) => tree.reduce((routes, node) => {
    const { children, key, id } = node;
    if (!children) {
      routes.push({
        id,
        path: '/' + paths.concat(key).join('/')
      });
      paths = [];
    } else {
      routes = fn(children, paths.concat(key), routes);
    }

    return routes;
  }, routes);

  return fn(tree);
};

function ContentBar() {
  const [routes, setRoutes] = useState([]);
  const { permissions } = useSelector(state => state.main);
  const permissionsTree = getAssembleTree(permissions);
  const firstRoute = useMemo(() => {
    const [firstRoute] = routes;
    return firstRoute;
  }, [routes]);

  useEffect(() => {
    const routes = getRoutes(permissionsTree);
    setRoutes(routes);
  }, []);

  return (
    <Content className={style.contentBar}>
      <Switch>
        {firstRoute && <Redirect exact from="/" to={firstRoute.path} />}
        <Route path="/home">{Home}</Route>
      </Switch>
    </Content>
  );
}

export default ContentBar;