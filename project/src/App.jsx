// import {
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
// } from 'react-router-dom';
// import MainLayout from './layouts/MainLayout';
// import LoginPage from './pages/LoginPage';
// import HomePage from './pages/HomePage';
// import Register from './components/Register'; 

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<MainLayout />}> 
//       <Route index element={<LoginPage />} />
//           <Route path="/" element={<LoginPage />} />
//       <Route path='home' element={<HomePage />} />
//       <Route path='register' element={<Register />} />
//     </Route>
//   )
// );

// const App = () => {
//   return <RouterProvider router={router} />;
// };

// export default App;


import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import HomePage from './pages/HomePage';
import Register from './components/Register';
import Auth from './components/Auth';
import GuestRoute from './pages/GuestRoute ';
import PrivateRoute from './pages/PrivateRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route
        index
        element={
          <GuestRoute>
            <Auth />
          </GuestRoute>
        }
      />
      <Route
        path='login'
        element={
          <GuestRoute>
            <Auth />
          </GuestRoute>
        }
      />
      <Route
        path='register'
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route
        path='home'
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;





