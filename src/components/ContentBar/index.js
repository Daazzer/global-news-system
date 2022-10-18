import { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { getAssembleTree } from '@/utils';
import Home from '@/views/Main/Home';
import UserList from '@/views/Main/UserManage/UserList';
import RoleList from '@/views/Main/PermissionManage/RoleList';
import PermissionList from '@/views/Main/PermissionManage/PermissionList';
import NewsAdd from '@/views/Main/NewsManage/NewsAdd';
import Draft from '@/views/Main/NewsManage/Draft';
import NewsCategory from '@/views/Main/NewsManage/NewsCategory';
import AuditNews from '@/views/Main/AuditManage/AuditNews';
import AuditList from '@/views/Main/AuditManage/AuditList';
import Unpublished from '@/views/Main/PublishMange/Unpublished';
import Published from '@/views/Main/PublishMange/Published';
import Revoked from '@/views/Main/PublishMange/Revoked';
import NotFound from '@/views/NotFound';
import style from './index.module.scss';

const { Content } = Layout;

const viewsMap = {
  '/home': Home,
  '/user-manage/user-list': UserList,
  '/permission-manage/role-list': RoleList,
  '/permission-manage/permission-list': PermissionList,
  '/news-manage/news-add': NewsAdd,
  '/news-manage/draft': Draft,
  '/news-manage/news-category': NewsCategory,
  '/audit-manage/audit-news': AuditNews,
  '/audit-manage/audit-list': AuditList,
  '/publish-manage/unpublished': Unpublished,
  '/publish-manage/published': Published,
  '/publish-manage/revoked': Revoked
};

const getRoutes = tree => {
  const fn = (tree, paths = [], routes = []) => tree.reduce((routes, node) => {
    const { children, key, id } = node;
    let path = '';
    if (!children) {
      path = '/' + paths.concat(key).join('/');
    }

    return !children
      ? routes.concat({
        key: id,
        path,
        component: viewsMap[path]
      })
      : fn(children, paths.concat(key), routes);
  }, routes);

  return fn(tree);
};

function ContentBar() {
  const [routes, setRoutes] = useState([]);
  const { permissions } = useSelector(state => state.main);

  useEffect(() => {
    const permissionsTree = getAssembleTree(permissions);
    const routes = getRoutes(permissionsTree);
    setRoutes(routes);
  }, [permissions]);

  return (
    <Content className={style.contentBar}>
      {routes.length
        ? <Switch>
          <Redirect exact from="/" to={routes[0].path} />
          {routes.map(route => <Route {...route} />)}
          <Route path="*">{NotFound}</Route>
        </Switch>
        : null}
    </Content>
  );
}

export default ContentBar;