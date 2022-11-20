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

export const StarContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    svg {
    width: 2em;
    }

    span {
      margin: 0px 20px;
      position: relative;
      white-space: nowrap;
      font-size: 20px;
      font-weight: 600;
      color: #0E1207;
    }
`

export const Table = styled.table`
  margin-top: 30px;
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
