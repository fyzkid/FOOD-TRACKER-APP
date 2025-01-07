import { Outlet, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

export const MainContext = createContext();

const MainLayout = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem('currentUser') ?? '{}')
  );
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(sessionStorage.getItem('isAuthenticated') ?? 'false')
  );

  const logout = () => {
    setCurrentUser({});
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setCurrentUser({});
      navigate('/login');
    }
  }, [isAuthenticated]);

  return (
    <MainContext.Provider value={{ logout, currentUser, isAuthenticated, setIsAuthenticated }}>
      <main className='grid grid-cols-[20%_80%] h-screen'>
        <Navbar />
        <div className='h-full overflow-y-auto bg-gray-100'>
          <Outlet />
        </div>
      </main>
    </MainContext.Provider>
  );
};

export default MainLayout;
