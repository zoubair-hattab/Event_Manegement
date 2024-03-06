import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

const PrivateRoute = () => {
  const { address } = useAccount();
  return address ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
