import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import style from './index.module.scss';

const { Header } = Layout;

function HeaderBar() {
  const dispatch = useDispatch();
  const { collapsed } = useSelector(state => state.style);
  const handleTriggerClick = () => dispatch({ type: 'style/TOGGLE_COLLAPSED' });

  return (
    <Header
      className={style.headerBar}
      style={{
        padding: 0
      }}
    >
      {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: style.headerBarSideBarTrigger,
        onClick: handleTriggerClick,
      })}
    </Header>
  );
}

export default HeaderBar;