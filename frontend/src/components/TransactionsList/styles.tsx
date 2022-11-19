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

export const StarContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
    width: 3em;
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
