import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';
import logo from '/images/DamicklesnPints.png';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(auth.loggedIn());

  useEffect(() => {
    setLoginCheck(auth.loggedIn());

    const handleStorageChange = () => {
      setLoginCheck(auth.loggedIn());
    };

    window.addEventListener('storage', handleStorageChange);
    // Listen for custom auth event
    window.addEventListener('authChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    auth.logout();
    setLoginCheck(false);
    window.dispatchEvent(new Event('authChange'));
  };



  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/" style={{ display: 'flex', alignItems: 'start' }}>
          <img
            src={logo}
            alt="DamicklesnPints"
            style={{
              height: '64px',
              width: 'auto',
              objectFit: 'contain',
            }}
          />
        </Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className="nav-item">
            <button type="button" >
              <Link to="/login">Login</Link>
            </button>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/menu" className="nav-link">
                My Menus
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reservation" className="nav-link">
                Reservation Management
              </Link>
            </li>
            <li className="nav-item">
            <button 
                type="button" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
