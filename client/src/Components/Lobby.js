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
import { LobbyClient } from "boardgame.io/client";
import { generateCombination } from "gfycat-style-urls";
import LiarClient from "../games/Liar/LiarClient";
import International from "../games/International/International";

var socketPath = "https://yellow-emu-15-server.loca.lt";
const socket = io(socketPath, { transports: ["websocket"] });
const bgiolobby = new LobbyClient({
  server: "https://yellow-emu-15-games.loca.lt",
  transports: ["websocket"],
});

function LobbyScreen(props) {
  const [selectedOption, setSelected] = useState(undefined);
  const [chatLog, setChatLog] = useState([]);
  const [users, setUsers] = useState([]);
  const [game, setGame] = useState("liar");
  const [username, setName] = useState(generateCombination(0));

  const [matchID, setMatchID] = useState(undefined);
  const [playerID, setPlayerID] = useState(undefined);
  const [credentials, setCredentials] = useState(undefined);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  var room = useParams().LobbyID;

  useEffect(() => {
    socket.emit("joinRoom", { username, room });
  }, [username, room]);

  useEffect(() => {
    //log current match id and player id
    console.log("matchID: " + matchID);
    console.log("playerID: " + playerID);
  }, [matchID, playerID]);

  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      pushMessage(user, text);
    });
    socket.on("users", ({ usersInRoom }) => {
      console.log("Users: " + usersInRoom);
      setUsers(usersInRoom);
    });
    socket.on("joinedRoom", ({ room, usersInRoom }) => {
      setUsers(usersInRoom);
    });
    socket.on("userChange", ({ user, text, usersInRoom }) => {
      pushMessage(user, text);
      setUsers(usersInRoom);
    });
    socket.on("gameStarts", function ({ game, matchID, playerID }) {
      console.log(
        "Server started a Game, Game: " + game + " MatchID: " + matchID,
        playerID
      );
      setMatchID(matchID);
      setPlayerID(playerID);

      joinGame(game, matchID, playerID);
    });
  }, [bgiolobby, navigate, room, username]);

  async function joinGame(game, matchID, playerID) {
    console.log("Joining Game: " + game + " MatchID: " + matchID);
    const { playerCredentials } = await bgiolobby.joinMatch(game, matchID, {
      playerID: playerID,
      playerName: username,
    });
    setCredentials(playerCredentials);
    console.log("PlayerCredentials: " + playerCredentials);

    navigate(`/${room}/${game}`);
  }

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
      socket.emit("userMessage", inputRef.current.value);
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
  async function handleStart(ev) {
    console.log("start", users.length);
    const { matchID } = await bgiolobby.createMatch("liar", {
      numPlayers: users.length,
    });
    console.log("Requesting game start", matchID, socket);
    socket.emit("requestStart", { game, room, matchID });

    console.log(matchID);
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
        <Route
          path="/liar"
          element={
            <LiarClient
              chatStates={chatStates}
              playerID={playerID} // Should probably check if playerID is undefined
              matchID={matchID} // Should probably check if matchID is undefined
              credentials={credentials}
              debug={true}
            />
          }
        />
        <Route
          path="/international"
          element={
            <International
              chatStates={chatStates}
              playerID={playerID}
              matchID={matchID}
              credentials={credentials}
            />
          }
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
