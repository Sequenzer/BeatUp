import React from "react";
import styled from "styled-components";

const StyledFooter = styled(Footer)`
  background-color: ${(props) => props.theme.secDark};
  grid-row: 4/5;
  grid-column: 1/3;
  width: 100%;
  margin-left: 0;
  display: grid;
  grid-template-columns: 12.5% 25% 25% 25% 12.5%;
  a {
    color: black;
    text-decoration: none;
    font-family: ${(props) => props.theme.textFont};
  }
  .footer_lks_col1 {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .footer_lks_col2 {
    grid-column: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .footer_lks_col3 {
    grid-column: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

function Footer(props) {
  return (
    <footer className={props.className}>
      <div className="footer_lks_col1">
        <a href="/">About Us</a>
        <a href="/">Contact</a>
        <a href="/">Blog</a>
      </div>
      <div className="footer_lks_col2">
        <a href="/">About Us</a>
        <a href="/">Contact</a>
        <a href="/">Blog</a>
      </div>
      <div className="footer_lks_col3">
        <a href="/">About Us</a>
        <a href="/">Contact</a>
        <a href="/">Blog</a>
      </div>
    </footer>
  );
}
export default StyledFooter;
