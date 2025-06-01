import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isBlocked = localStorage.getItem('isBlocked') === 'true';

  if (token && !isBlocked) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default GuestRoute;
