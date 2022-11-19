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
	    background: linear-gradient(-45deg, #e2e2e2, #DCDCDC, #EDEDED, #FFFF, #E6E6E6, #DCDCDC, #e2e2e2);
	  background-size: 400% 400%;
	  animation: gradient 22s ease infinite;
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