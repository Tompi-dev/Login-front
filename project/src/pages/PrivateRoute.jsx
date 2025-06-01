import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isBlocked = localStorage.getItem('isBlocked') === 'true';

  if (!token || isBlocked) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
