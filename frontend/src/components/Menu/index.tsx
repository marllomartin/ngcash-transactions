import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container } from './styles';

const Menu: React.FC = () => {

  const history = useNavigate();
  const [userData] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  useEffect(() => {
    if (userData === undefined || userData === null) {
      localStorage.removeItem('user');
      history('/');
    }
  }, [history, userData]);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    history('/');
  }

  return (
    <Container>
      <nav>
        <a
          href="/"
          onClick={handleLogOut}
        >
          sair
        </a>
      </nav>
    </Container>
  )
}

export default Menu;