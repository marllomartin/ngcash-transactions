import styled from 'styled-components';

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 60px 30px;

  .span {
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
    background-color: #e7ccfc;
  }
`

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;

  button {
    align-self: center;
    border: none;
    height: 40px;
    font-weight: 900;
    cursor: pointer;
    margin: 5px;
    background-color: transparent;
    color: white;
    text-transform: uppercase;
    &:hover {
      svg {
      color: #dd373a;
    }
    }
  }

  svg {
    height: 29px;
    width: 30px;
    color: black;
    transition: 0.25s;
  }
`
