import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const location = useLocation();
  const [ loginCheck, setLoginCheck ] = useState(false);

  if (!auth.loggedIn() || location.pathname === '/') {
    return null;
  }
 

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div className='nav'>
      <div className='nav-title'>
      <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="./images/DamicklesnPints.png" 
            alt="DamicklesnPints"
            style={{
              height: '64px', 
              width: 'auto',
              objectFit: 'contain'
            }}
            />
            </Link>
      </div>
      <ul>
      {
        !loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <>
            <li className='nav-item'>
              <Link to='/menu' className='nav-link'>My Menus</Link>
            </li>
            <li className='nav-item'>
              <Link to='/reservation' className='nav-link'>Reservation Management</Link>
            </li>
            <li className='nav-item'>
              <button type='button' onClick={() => {
                auth.logout();
              }}>Logout</button>
            </li>
          </>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
