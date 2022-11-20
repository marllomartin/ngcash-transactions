import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 6px;
  margin: 15px 10px 20px;
  padding: 25px;
  border: 3px solid black;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);

  header {
    width: 100%;
    position: relative;
    white-space: nowrap;
    font-size: 20px;
    font-weight: 600;
    color: #0E1207;
  }

  header::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 3px;
    width: 27px;
    border-radius: 8px;
    background-color: black;
  }

  input {
    margin-top: 30px;
    border: none;
    background-color: #ededed;
    height: 40px;
    width: 300px;
    padding-left: 10px;
  }
`
