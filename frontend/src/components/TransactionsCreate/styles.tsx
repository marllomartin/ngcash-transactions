import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 5px;
  background-color: #fff;
`

export const InputContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;

  label {
    margin-top: 15px;
    margin-bottom: 5px;
  }
  input {
    border: none;
    background-color: #ededed;
    height: 40px;
    width: 100%;
    min-width: 80px;
    padding-left: 10px;
    margin: 5px;
  }
`

export const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    align-self: center;
    border: 2px solid black;
    border-radius: 15px;
    width: 170px;
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

  .button:disabled {
    background-color: #999999;
    color: black;
    pointer-events: none;
  }
`
