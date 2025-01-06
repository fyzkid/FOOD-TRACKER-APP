import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard/>} />
        <Route path='/Dashboard/Settings' element={<Settings/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
