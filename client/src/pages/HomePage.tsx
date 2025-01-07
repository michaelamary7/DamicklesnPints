import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import ErrorPage from '../pages/ErrorPage';
import auth from '../utils/auth';
import MenuItems from '../components/MenuItems';
import TrendingMenu from '../components/TrendingMenus';
import { GET_MENU_ITEMS } from '../graphql/queries';
import RestaurantMenus from '../components/RestaurantMenus';

const HomePage = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  
  // Replace manual fetching with Apollo useQuery
  const { loading, error } = useQuery(GET_MENU_ITEMS, {
    // Only fetch if user is logged in
    skip: !loginCheck,
    // Add auth token to requests
    context: {
      headers: {
        authorization: `Bearer ${auth.getToken()}`
      }
    }
  });

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  if (error) {
    console.error('GraphQL error:', error);
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!loginCheck ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Welcome to DamicklesnPints!
          </h1>
          
          <main className="space-y-12">
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Trending Restaurant Menus
              </h2>
              <TrendingMenu />
            </section>

            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Explore More Menus
              </h2>
              <RestaurantMenus />
            </section>
          </main>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <main>
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Your Menu Items
              </h2>
              {loading ? (
                <div className="text-center py-4">Loading menu items...</div>
              ) : (
                <MenuItems />
              )}
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default HomePage;