import React from 'react'
import SvgNgcashLogo from '../../styles/svg/ngcash-logo';
import { Container } from './styles';

const Header: React.FC = () => {


  return (
    <Container>
      <SvgNgcashLogo
        width={`12em`}
      />
    </Container>
  )
}

export default Header;
