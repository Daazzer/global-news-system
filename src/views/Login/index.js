import { useDispatch, useSelector } from 'react-redux';
import {
  Form,
  Input,
  Button,
  message
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { getUsers } from '@/api/login';
import style from './index.module.scss';

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.style);

  const handleLogin = async formData => {
    const res = await getUsers(formData);
    const { data } = res;
    const [user] = data;

    if (
      !user ||
      formData.password !== user.password ||
      formData.username !== user.username
    ) {
      message.error('账号或密码错误！');
      return;
    }

    delete user.password;
    dispatch({ type: 'login/LOGIN', payload: user });
    history.replace('/');
  };

  return (
    <div className={style.login}>
      <Form
        name="login"
        autoComplete="off"
        className={style.loginForm}
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
      >
        <Form.Item>
          <h2 className={style.loginFormTitle}>全球新闻发布管理系统</h2>
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '用户名不能为空！',
            }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="请输入用户名"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '密码不能为空！',
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入用密码"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={style.loginFormLoginButton}
            loading={loading}
          >登录</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;