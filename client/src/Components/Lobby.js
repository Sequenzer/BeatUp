import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import GameLog from "./SBLFrame/Gamelog";
import Settings from "./SBLFrame/LobbySettings";
import {
  useParams,
  useNavigate,
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import io from "socket.io-client";
import { generateCombination } from "gfycat-style-urls";
import { push } from "gfycat-style-urls/adjectives";
import Liar from "../games/Liar/Liar";
import International from "../games/International/International";

var socketPath = "https://yellow-emu-15-server.loca.lt";
const socket = io(socketPath, { transports: ["websocket"] });

function LobbyScreen(props) {
  const [selectedOption, setSelected] = useState(undefined);
  const [chatLog, setChatLog] = useState([]);
  const [users, setUsers] = useState([]);
  const [game, setGame] = useState("liar");
  const [username, setName] = useState(generateCombination(0));
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  var room = useParams().LobbyID;

  useEffect(() => {
    socket.emit("joinRoom", { username, room });
    socket.emit("requestUsers", { room });
  }, [username, room]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      pushMessage(user, text);
    });
    socket.on("users", (users) => {
      setUsers(users);
    });
    socket.on("newUser", ({ user, text }) => {
      pushMessage(user, text);
      socket.emit("requestUsers", { room });
    });
    socket.on("userLeft", ({ user, text }) => {
      pushMessage(user, text);
      socket.emit("requestUsers", { room });
    });
    socket.on("gameStarts", ({ game }) => {
      navigate(`/${room}/${game}`);
    });
  }, [socket]);

  const handleOptionClick = (ev, params) => {
    if (selectedOption === params.value) {
      setSelected(undefined);
    } else {
      setSelected(params.value);
    }
  };
  function handleSubmit(ev) {
    console.log("submit", inputRef.current.value);
    if (inputRef.current.value !== "") {
      socket.emit("chat", inputRef.current.value);
      pushMessage(username, inputRef.current.value);
    }
    inputRef.current.value = "";
    ev.preventDefault();
  }
  function pushMessage(author, value) {
    setChatLog((oldLog) => [...oldLog, { author, value }]);
  }

  function handleSelection(ev, { type, value }) {
    console.log("params", type, value);
    if (type === "game") {
      setGame(value);
    }
  }
  function handleStart(ev) {
    socket.emit("requestStart", { game, room });
  }

  var chatStates = {
    name: username,
    inputRef: inputRef,
    chatEndRef: chatEndRef,
    handleSubmit: handleSubmit,
    chatLog: chatLog,
  };
  return (
    <div className={props.className}>
      <Routes>
        <Route
          path="/Lobby"
          element={
            <React.Fragment>
              <Settings
                className="settings"
                handleOptionClick={handleOptionClick}
                selected={selectedOption}
                handleSelection={handleSelection}
                users={users}
                game={game}
                handleStart={handleStart}
              />
              <GameLog className="gamelog" chatStates={chatStates} />{" "}
            </React.Fragment>
          }
        />
        <Route path="/liar" element={<Liar chatStates={chatStates} />} />
        <Route
          path="/international"
          element={<International chatStates={chatStates} />}
        />
      </Routes>
    </div>
  );
}

const StyledLobbyScreen = styled(LobbyScreen)`
  grid-row: 1/3;
  grid-column: 2/4;
  display: grid;
  grid-template-rows: 2fr 5fr 2fr;
  min-height: 0;
  grid-template-columns: 3fr 2fr 0.25fr 2fr 3fr;
  .settings,
  .gamelog {
    grid-row: 2/3;
    min-height: 0;
  }
  .settings {
    grid-column: 2/3;
  }
  .gamelog {
    grid-column: 4/5;
  }
  .bgio-client {
    height: 100%;
    grid-column: 1/6;
    grid-row: 1/4;
    //animation: 2s linear 0s 1 slideToMiddle;
    //overflow: hidden;
    display: inline-block;
  }
  .bgio-client > div {
    width: 100%;
  }
`;

export default StyledLobbyScreen;
