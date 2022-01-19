import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as ChessLogo } from "../assets/board-figure.svg";
import { ReactComponent as BeautUpLogo } from "../assets/BeatUpLogo2.svg";
import { ReactComponent as Settings } from "../assets/settings.svg";

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
  font-family: ${(props) => props.theme.titleFont}, sans-serif;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  user-select: none;
`;

const StyledNavbar = styled(Navbar)`
  background-color: ${(props) => props.theme.white};
  grid-row: 2/3;
  grid-column: 1/3;
  width: 100%;
  display: flex;
  padding: 0px 1.3vw;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  box-sizing: border-box;
  .left {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .navLinks {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-right: 1.5vw;
  }
  .icon {
    width: auto;
    height: 50px;
  }
  .homebtn {
    margin-left: -0.5em;
  }
  .settings {
    width: auto;
    height: 4vh;
    fill: ${(props) => props.theme.black};
    :hover {
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .logoBlock {
    background: ${(props) => props.theme.primary};
    margin-right: 2vw;
    height: 3rem;
    line-height: 1rem;
    padding: 0 2px;
    display: flex;
    align-items: center;
    border-radius: 0.5rem 0.1rem;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 2px rgba(0, 0, 0, 0.2),
      0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.1),
      0px 16px 16px rgba(0, 0, 0, 0.05);
    :hover {
      background-color: ${(props) => props.theme.secondary};
      cursor: pointer;
    }
    :active {
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15),
        inset 0px 2px 2px rgba(0, 0, 0, 0.2),
        inset 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
  }
`;

const StyledItem = styled(Item)`
  font-family: ${(props) => props.theme.titleFont};
  background-color: ${(props) => props.theme.primary};
  flex: 0 0 auto;
  margin-right: 1.5vw;
  height: 1.5rem;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 2px rgba(0, 0, 0, 0.2),
    0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.1),
    0px 16px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 0.8em;
  border-radius: 0.7rem 0;
  :hover {
    background-color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15),
      inset 0px 2px 2px rgba(0, 0, 0, 0.2),
      inset 0px 1px 1px rgba(0, 0, 0, 0.25);
  }
`;

function Navbar(props) {
  return (
    <div className={props.className}>
      <div className="left">
        <div className="logoBlock">
          <StyledLink className="homebtn" to="/">
            <BeautUpLogo className="icon" href="/" />
          </StyledLink>
        </div>
        <div className="navLinks"></div>
      </div>
      <div className="right">
        <Settings className="icon settings" href="/" />
        {/* <StyledItem content={"Lobby"} to="/createLobby" fullpage={true} /> */}
      </div>
    </div>
  );
}

function Item(props) {
  return (
    <div className={props.className}>
      <StyledLink
        to={props.to}
        style={{ textDecoration: "none" }}
        onClick={(ev) => {
          if (props.onClick) {
            props.onClick(ev);
          }
        }}
      >
        {props.content}
      </StyledLink>
    </div>
  );
}

export { StyledNavbar, StyledItem };
