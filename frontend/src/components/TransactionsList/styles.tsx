import styled from 'styled-components';

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 60px 30px;

  .span {
  }
`
export const NotFound = styled.div`
  p {
    font-size: 20px;
    margin: 50px;
  }
`

export const BalanceContainer = styled.div`
  border-radius: 6px;
  margin: 15px 10px 20px;
  padding: 15px;
  border: 3px solid black;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
`

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: center;

  button{
    border: 2px solid black;
    border-radius: 15px;
    width: 100%;
    height: 40px;
    font-weight: 700;
    cursor: pointer;
    background-color: white;
    color: black;
    text-transform: uppercase;
    box-shadow: 5px 5px black;
    margin: 4px 10px 4px 10px;
  }

  button:active {
    box-shadow: 0 0 0 white;
    margin: 6px 10px 2px 10px;
  }

  .active {
    box-shadow: 0 0 0 white;
    margin: 6px 10px 2px 10px;
  }
`

export const StarContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    svg {
    width: 1.5em;
    margin: 0px -10px;
    }
    p {
      margin: 0px 10px;
      position: relative;
      white-space: nowrap;
      font-size: 20px;
      font-weight: 600;
      color: #0E1207;
    }
    span {
      margin: 0px 10px;
      position: relative;
      white-space: nowrap;
      font-size: 20px;
      font-weight: 600;
      color: #0E1207;
    }
`

export const Table = styled.table`
  margin-top: 20px;
  table-layout: fixed;

  th {
    color: #0E1207;
    white-space: nowrap;
  }

  td, th {
    text-align: left;
    padding: 10px;
    white-space: pre-wrap;
  }

  tr:nth-child(even) {
    background-color: #e2e2e2;
  }
`
