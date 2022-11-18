import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import Transactions from './pages/Transactions';

import GlobalStyle from './styles/GlobalStyle';

const App: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
    <GlobalStyle />
  </>
)

export default App;
