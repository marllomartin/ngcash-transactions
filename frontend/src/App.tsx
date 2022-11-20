import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Transactions from './pages/Transactions';

import GlobalStyle from './styles/GlobalStyle';
import ProtectedRoute, { ProtectedRouteProps } from './routes/ProtectedRoute';
import { SessionContext } from './context/SessionContext';

const App: React.FC = () => {

  const {isAuthenticated} = useContext(SessionContext);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!isAuthenticated,
    authenticationPath: '/',
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/transactions' element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<Transactions />} />} />
      </Routes>
      <GlobalStyle />
    </>
  )
}

export default App;
