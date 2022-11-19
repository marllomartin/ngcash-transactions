import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  margin-top: 20px;
  display: flex;
  align-items: center;

  a {
    font-size: 20px;
    margin: 10px;
    color: black;
    padding: 10px;
    white-space: nowrap;
    text-decoration: underline;
    font-weight: 600;
  }

  a:active {
    color: #000000a5;
  }
`
