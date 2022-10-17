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
        path: '/' + [...paths, key].join('/')
      });
      paths = [];
    } else {
      routes = fn(children, [...paths, key], routes);
    }

    return routes;
  }, routes);

  return fn(tree);
};

function ContentBar() {
  const { permissions } = useSelector(state => state.main);
  const permissionsTree = getAssembleTree(permissions);
  const routes = getRoutes(permissionsTree);
  console.log(routes);
  return (
    <Content className={style.contentBar}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home">{Home}</Route>
      </Switch>
    </Content>
  );
}

export default ContentBar;