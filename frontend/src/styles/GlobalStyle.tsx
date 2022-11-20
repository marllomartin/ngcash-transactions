import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  #root{
    margin:0 auto;
  }
  body {
    background: linear-gradient(-45deg, #C9C9C9, #DFDFDF, #F0F0F0, #FFFF, #F0F0F0, #DFDFDF, #C9C9C9);
    background-size: 400% 400%;
    animation: gradient 20s ease infinite;
    height: 100vh;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
		background-position: 0% 50%;
    }
}
`