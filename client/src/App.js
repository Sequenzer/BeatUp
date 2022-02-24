import React, { useEffect, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { StyledNavbar } from "./Components/Navbar";
import StyledFooter from "./Components/Footer";
import StyledContent from "./Components/Content";
import Bungee from "./assets/Bungee-Regular.ttf";
import Roboto from "./assets/Roboto-Regular.ttf";
import Volkhov from "./assets/Volkhov-Bold.ttf";
import BungeeInline from "./assets/BungeeInline-Regular.ttf";
import { useLocation } from "react-router-dom";
import { generateCombination } from "gfycat-style-urls";

const theme = {
  lightShade: "#FEFEF5",
  lightAccent: "#7CC88D",
  primary: "#437BA1",
  darkAccent: "#bf50a6",
  darkShade: "#1E2B35",

  shadowFilter:
    "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15)) drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.05))",
  secBlack: "#262730",

  secondary: "#F3EBE9",
  secDark: "#262730",
  secLight: "#373841",
  white: "white",
  green: "#05381E",
  blue: "#A2DBFA",
  chatgreen: "#7cc88d",
  chatblue: "#9AAAE6",

  textFont: "Roboto,sans-serif",
  cardFont: "Volkhov,serif",
  titleFont: "bungee,sans-serif",
  alttitleFont: "bungee inline, cursive",
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
    font-family: 'Bungee Inline';
    src: url(${BungeeInline}) format('truetype');
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
    background-color: ${(props) => props.theme.primary};
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
  const [activeSettings, setActiveSettings] = useState(false);
  const [username, setName] = useState(generateCombination(0));

  function handleNameChange(evt) {
    setName(evt.target[1].value);
    localStorage.setItem("username", evt.target[1].value);
    evt.preventDefault();
  }

  useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      setName(localStorage.getItem("username"));
      console.log(localStorage.getItem("username"));
    } else {
      localStorage.setItem("username", username);
    }
  }, [username]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StyledNavbar
        activeSettings={activeSettings}
        setActiveSettings={setActiveSettings}
        username={username}
        handleNameChange={handleNameChange}
      />
      <StyledContent username={username} />
      {/* <StyledFooter /> */}
    </ThemeProvider>
  );
}

export default App;
