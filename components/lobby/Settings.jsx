import styled from "styled-components";
import { useState } from "react";

import Button from "components/lobby/Button";

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
    <>
      <ul className={props.className}>
        <li className="restart">
          <Button
            active={true}
            color="lightShade"
            onClick={(ev) => handleOptionClick(ev, { value: "restart" })}
          >
            Restart
          </Button>
          {selected === "restart" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
            </ul>
          ) : null}
        </li>

        <li className="history">
          <Button
            color="lightShade"
            onClick={(ev) => handleOptionClick(ev, { value: "history" })}
          >
            History
          </Button>
          {selected === "history" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
            </ul>
          ) : null}
        </li>
        <li className="options">
          <Button
            color="lightShade"
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
        <li className="giveup">
          <Button
            color="lightShade"
            onClick={(ev) => handleOptionClick(ev, { value: "giveup" })}
          >
            Give Up!
          </Button>
          {selected === "giveup" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
            </ul>
          ) : null}
        </li>
      </ul>
    </>
  );
}

export default styled(Settings)`
  width: 40%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.darkShade};
  list-style: none;
  li {
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
    background-color: grey;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.2),
      inset 1px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 1%;
    align-items: center;
    flex-grow: 4;
  }
  .ctx-item {
    font-family: ${(props) => props.theme.fonts.title};
    line-height: 1.5rem;
    margin-top: 0.4em;
    margin-bottom: 0;
    border-radius: 0.7rem 0;
    background-color: ${(props) => props.theme.colors.lightAccent};
    width: 90%;
    border-radius: 2px;
  }
  .ctx-item:first-child {
    margin-top: 0.7em;
  }
  .ctx-item:last-child {
    margin-bottom: 0.7em;
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
