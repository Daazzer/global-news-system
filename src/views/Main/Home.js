import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch({ type: 'login/LOGOUT' });
    history.replace('/login');
  };

  return (
    <div className="home">
      Home
      <Button type="primary" onClick={handleLogout}>退出</Button>
    </div>
  );
}

export default Home;