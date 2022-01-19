import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import StyledFooter from "./Components/Footer";
import Bungee from "./assets/Bungee-Regular.ttf";
import Roboto from "./assets/Roboto-Regular.ttf";
import Volkhov from "./assets/Volkhov-Bold.ttf";
import { ReactComponent as Logo } from "./assets/board-figure.svg";

const theme = {
  primary: "#CFCFC9",
  secondary: "#F3EBE9",
  secDark: "#262730",
  secLight: "#373841",
  white: "#FEFEF5",
  green: "#05381E",
  blue: "#A2DBFA",
  chatgreen: "#7cc88d",
  chatblue: "#9AAAE6",

  textFont: "roboto,sans-serif",
  cardFont: "Volkhov,serif",
  titleFont: "bungee,sans-serif",
  navheight: "3rem",
  footheight: "0.6fr",
  boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75);",
};
const GlobalStyle = createGlobalStyle`
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.logo {
  width: auto;
  height: 15vw;
}
p{
  font-family: "Bungee", sans-serif;
  width: 30vw;
  font-size: 1.5rem;
  text-align: center;
}
@font-face {
    font-family: 'Bungee';
    src: url(${Bungee}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'Roboto';
    src: url(${Roboto}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
  @font-face {
    font-family: 'Volkhov';
    src: url(${Volkhov}) format('truetype');
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }
body {
    background-color: ${(props) => props.theme.white};
    margin:0;
    
  }
  #root{
    display: grid;
    height:100vh;
    grid-template-rows: ${(props) =>
      "1.5rem " + props.theme.navheight + " 8fr " + props.theme.footheight};
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="main">
        <Logo className="logo" />
        <p>
          This Site is still under construction.
          <b /> Please check back later for updates.
        </p>
      </div>

      <StyledFooter />
    </ThemeProvider>
  );
}

export default App;
