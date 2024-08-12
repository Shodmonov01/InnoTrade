import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const token = JSON.parse(localStorage.getItem('token'))?.access;
//   const selectedCompany = JSON.parse(localStorage.getItem('selectedCompany'));

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   if (!selectedCompany && window.location.pathname !== '/company') {
//     return <Navigate to="/company" />;
//   }

//   return children;
// };

// export default PrivateRoute;

