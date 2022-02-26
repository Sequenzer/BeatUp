import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
html{
  background: ${(props) => props.theme.colors.primary};;
  display:block;
  height: 100vh;
  max-width: 100vw;
  overflow: hidden;
}

body{
  background-color:${(props) => props.theme.colors.primary};
  min-height:100vh;
  
  margin:0;
  font-family: Poppins;
}
`;

const theme = {
  colors: {
    lightShade: "#FEFEF5",
    lightAccent: "#7CC88D",
    primary: "#437BA1",
    darkAccent: "#bf50a6",
    darkShade: "#1E2B35",
  },
  filters: {
    sharp:
      "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25)) drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15)) drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.1)) drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.05))",
  },
  fonts: {
    title: "Bungee,sans-serif",
    text: "Roboto,sans-serif",
    card: "Volkhov,serif",
  },
  shadows: {
    sharp:
      "0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 2px rgba(0, 0, 0, 0.2),0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.1),0px 16px 16px rgba(0, 0, 0, 0.05)",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
