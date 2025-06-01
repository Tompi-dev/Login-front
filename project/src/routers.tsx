
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import Register from './components/Register';
import Auth from './components/Auth';
import GuestRoute from './pages/GuestRoute';
import PrivateRoute from './pages/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route
        index
        element={
          <GuestRoute>
            <Auth />
          </GuestRoute>
        }
      />
     
      <Route
        path="register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route
        path="home"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

export default router;



