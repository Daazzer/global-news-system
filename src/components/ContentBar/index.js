import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Layout } from 'antd';
import Home from '@/views/Main/Home';
import style from './index.module.scss';

const { Content } = Layout;

function ContentBar() {
  return (
    <Content
      className={style.contentBar}
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </Content>
  );
}

export default ContentBar;