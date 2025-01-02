import { useEffect, useState, useLayoutEffect } from 'react';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import MenuItems from '../components/MenuItems';
import TrendingMenu from '../components/TrendingMenus';


const HomePage = () => {
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await retrieveMenuItems();
      setMenuItems(data);
    } catch (err) {
      console.error('Failed to retrieve tickets:', err);
      setError(true);
    }
  };


  useLayoutEffect(() => {
    checkLogin();
  }, []);

  useEffect(() => {
    if(loginCheck) {
      fetchTickets();
    }
  }, [loginCheck]);

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
    {
      !loginCheck ? (
        <div className='login-notice'>
          <h1>
            Welcome to DamicklesnPints!
          </h1>
          <main className="main-content">
            <section className="menu-section">
             <h2>Trending Restaurant Menus</h2>
             <TrendingMenu />
            </section>
          </main>
        </div>  
      ) : (
          <div className='board'>
            <main className="main-content">
            <section className="menu-section">
             <h2>Your Menu Items</h2>
             <MenuItems />
            </section>
          </main>
          </div>
        )
    }
    </>
  );
};

export default HomePage;
import { getMenuItems } from '../utils/API';

async function retrieveMenuItems(): Promise<MenuItems[]> {
    try {
        const token = auth.getToken();
        if (!token) {
            throw new Error('No token found');
        }
        const response = await getMenuItems(token);
        if (!response.ok) {
            throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error retrieving menu items:', error);
        throw error;
    }
}
