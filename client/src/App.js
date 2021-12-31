import React, { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { StyledNavbar } from "./Components/Navbar";
import StyledFooter from "./Components/Footer";
import StyledContent from "./Components/Content";
import Bungee from "./assets/Bungee-Regular.ttf";
import Roboto from "./assets/Roboto-Regular.ttf";
import Volkhov from "./assets/Volkhov-Bold.ttf";
import { useLocation } from "react-router-dom";

const theme = {
  primary: "#CFCFC9",
  secondary: "#F3EBE9",
  secDark: "#262730",
  secLight: "#373841",
  white: "#fffff4",
  green: "#05381E",
  blue: "#A2DBFA",
  chatgreen: "#7cc88d",
  chatblue: "#9AAAE6",

  textFont: "roboto,sans-serif",
  cardFont: "Volkhov,serif",
  titleFont: "bungee,sans-serif",
  navheight: "3rem",
  footheight: "1fr",
  boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75);",
};
const GlobalStyle = createGlobalStyle`
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
      <StyledNavbar />
      <StyledContent />
      <StyledFooter />
    </ThemeProvider>
  );
}

export default App;
