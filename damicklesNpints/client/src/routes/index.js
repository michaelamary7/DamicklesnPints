import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import MenuBuilder from '../pages/MenuBuilder';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/menu-builder" element={<PrivateRoute><MenuBuilder /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
