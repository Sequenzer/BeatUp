import React, { useState } from "react";
import styled from "styled-components";

import {
  StyledBtn as Button,
  StyledHeader as Header,
} from "../utils/Basic-Components";

function Settings(props) {
  const [selected, setSelected] = useState(undefined);

  const handleOptionClick = (ev, params) => {
    if (selected === params.value) {
      setSelected(undefined);
    } else {
      setSelected(params.value);
    }
  };

  return (
    <div className={props.className}>
      <Header>Settings</Header>
      <ul>
        <li className="start-game">
          <Button
            active={true}
            color="primary"
            onClick={(ev) => props.handleStart(ev)}
          >
            Let's Go
          </Button>
        </li>

        <li className="games">
          <Button
            color="primary"
            onClick={(ev) => handleOptionClick(ev, { value: "games" })}
          >
            Games
          </Button>
          {selected === "games" ? (
            <ul className="ctx-menu">
              <li
                className={
                  props.game === "liar"
                    ? "ctx-item active"
                    : "ctx-item inactive"
                }
                onClick={(ev) =>
                  props.handleSelection(ev, { type: "game", value: "liar" })
                }
              >
                Liar
              </li>
              <li
                className={
                  props.game === "international"
                    ? "ctx-item active"
                    : "ctx-item inactive"
                }
                onClick={(ev) =>
                  props.handleSelection(ev, {
                    type: "game",
                    value: "international",
                  })
                }
              >
                International
              </li>
            </ul>
          ) : null}
        </li>
        <li className="options">
          <Button
            color="primary"
            onClick={(ev) => handleOptionClick(ev, { value: "options" })}
          >
            Options
          </Button>
          {selected === "options" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
            </ul>
          ) : null}
        </li>
        <li className="players">
          <Button
            color="primary"
            onClick={(ev) => handleOptionClick(ev, { value: "players" })}
          >
            Players
          </Button>
          {selected === "players" ? (
            <ul className="ctx-menu">
              {props.users.map((user, i) => (
                <li key={i} className="ctx-item">
                  {user.username}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      </ul>
    </div>
  );
}

const StyledSettings = styled(Settings)`
  grid-column: 1/3;
  grid-row: 1/2;
  background: ${(props) => props.theme.secondary};
  display: grid;
  grid-template-rows: 10% 90%;
  ul {
    grid-row: 2/3;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: ${(props) => props.theme.secDark};
    list-style: none;
    box-shadow: inset -16px 0px 16px rgba(0, 0, 0, 0.05),
      inset -8px 0px 8px rgba(0, 0, 0, 0.1);
  }
  li {
    cursor: pointer;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }
  li:first-child {
    margin-top: 1em;
  }
  .ctx-menu {
    margin: 0.3em 0;
    background-color: ${(props) => props.theme.secLight};
    width: calc(60% + 2 * 0.8em);
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.2),
      inset 1px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    align-items: center;
    flex-grow: 4;
  }
  .ctx-item.active {
    background-color:green;
  }
  
  .ctx-item {
    font-family: ${(props) => props.theme.textFont};
    margin-top: 0.2em;
    margin-bottom: 0;
    background-color: ${(props) => props.theme.blue};
    width: 90%;
    border-radius: 2px;
    :hover {
      background-color: red;
  }
  
  .ctx-item:first-child {
    margin-top: 0.5em;
  }
  .ctx-item:last-child {
    margin-bottom: 0.5em;
  }
  //flex-grow: 4;
  .restart {
    flex-grow: ${(props) => (props.selected === "restart" ? 4 : "")};
  }
  .history {
    flex-grow: ${(props) => (props.selected === "history" ? 4 : "")};
  }
  .options {
    flex-grow: ${(props) => (props.selected === "options" ? 4 : "")};
  }
  .giveup {
    flex-grow: ${(props) => (props.selected === "giveup" ? 4 : "")};
  }
`;

export default StyledSettings;
