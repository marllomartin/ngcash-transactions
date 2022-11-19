import React from 'react'
import { Container } from './styles'
import UserLogin from '../UserLogin';
import Header from '../Header';

const LayoutLogin: React.FC = () => (
  <Container>
    <Header />
    <UserLogin />
  </Container>
)

export default LayoutLogin;
