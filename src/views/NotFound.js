import logo from '@/assets/logo.svg';

function NotFound() {
  return (
    <div
      className="not-found"
      style={{
        position: 'relative',
        height: '100%'
      }}>
      <div
        className="not-found__logo"
        style={{
          position: 'absolute',
          left: '50%',
          top: '10%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          className="not-found__logo__img"
          width={600}
          src={logo}
        />
        <h2 className="not-found__logo__text">404NotFound!</h2>
      </div>
    </div>
  );
}

export default NotFound;