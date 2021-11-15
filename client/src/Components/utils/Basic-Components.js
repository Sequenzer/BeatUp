import React from "react";
import styled from "styled-components";

const Btn = (props) => (
  <div className={props.className} onClick={props.onClick}>
    <nobr>{props.children}</nobr>
  </div>
);
const StyledBtn = styled(Btn)`
  color: ${(props) =>
    props.color === "secDark" ? props.theme.white : "black"};
  background-color: ${(props) => props.theme[props.color]};
  font-family: ${(props) => props.theme.textFont};
  font-size: 1.5em;
  line-height: 21px;
  width: 60%;
  user-select: none;
  padding: 0.2em 0.8em;
  vertical-align: middle;
  text-align: center;
  border-radius: 2px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 2px rgba(0, 0, 0, 0.2),
    0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.1),
    0px 16px 16px rgba(0, 0, 0, 0.05);
  :hover {
    background-color: ${(props) => props.theme.secondary};
    color: black;
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15),
      inset 0px 2px 2px rgba(0, 0, 0, 0.2),
      inset 0px 1px 1px rgba(0, 0, 0, 0.25), 0px 1px 1px rgba(0, 0, 0, 0.25),
      0px 2px 2px rgba(0, 0, 0, 0.2), 0px 4px 4px rgba(0, 0, 0, 0.15),
      0px 8px 8px rgba(0, 0, 0, 0.1), 0px 16px 16px rgba(0, 0, 0, 0.05);
  }
`;
const Header = (props) => (
  <div className={props.className}>{props.children}</div>
);
const StyledHeader = styled(Header)`
  background-color: ${(props) => props.theme.secDark};
  text-align: center;
  vertical-align: middle;
  color: white;
  font-family: ${(props) => props.theme.titleFont};
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-row: 1/2;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
export { StyledBtn, StyledHeader };
