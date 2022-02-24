import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Settings from "./utils/SettingsLogo";
import GlobalSettings from "./GlobalSettings";

import { BeatUpLogo } from "./utils/BeatUpLogo";
import { utils } from "sortablejs";

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
  .settings {
    width: auto;
    height: 4vh;
    z-index: 10;
    filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.25))
      drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))
      drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))
      drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.1))
      drop-shadow(0px 16px 16px rgba(0, 0, 0, 0.05));
    :hover {
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .logoBlock {
  }
  .homebtn {
    background-color: ${(props) => props.theme.darkShade};
    margin-right: 2vw;
    height: 3rem;
    width: 2.3rem;
    line-height: 1rem;
    position: relative;
    border-radius: 0.6rem 0.1rem;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 2px rgba(0, 0, 0, 0.2),
      0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.1),
      0px 16px 16px rgba(0, 0, 0, 0.05);
    :hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.lightShade};
    }
    :active {
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15),
        inset 0px 2px 2px rgba(0, 0, 0, 0.2),
        inset 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
  }
  .logo {
    position: absolute;
    width: auto;
    height: 100%;
    left: calc(50% - 3em / 2);
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
  const [Logo, punchLogo] = useState(false);

  return (
    <div className={props.className}>
      <div className="left">
        <StyledLink
          className="homebtn"
          to="/"
          onMouseEnter={() => punchLogo(true)}
          onMouseLeave={() => punchLogo(false)}
        >
          <BeatUpLogo light={!Logo} className="logo" />
        </StyledLink>
        <div className="navLinks"></div>
      </div>
      <div className="right">
        <Settings
          className="settings"
          activeSettings={props.activeSettings}
          onClick={() => {
            props.setActiveSettings(!props.activeSettings);
          }}
        />
        {props.activeSettings ? (
          <GlobalSettings
            username={props.username}
            handleNameChange={props.handleNameChange}
          />
        ) : null}
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
