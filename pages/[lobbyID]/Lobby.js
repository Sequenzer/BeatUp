import { useRef, useState } from "react";

import styled from "styled-components";
import { useRouter } from "next/router";
import useUser from "hooks/useUser";

import GameLog from "components/lobby/GameLog";
import Settings from "components/lobby/Settings";

const Lobby = (props) => {
  const router = useRouter();
  const { lobbyID } = router.query;
  const { user, mutateUser } = useUser();
  const [chatLog, setChatLog] = useState([]);

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);

  function handleSubmit(ev) {
    console.log("submit", inputRef.current.value);
    if (inputRef.current.value !== "") {
      // socket.emit("userMessage", inputRef.current.value);
      // pushMessage(username, inputRef.current.value);
    }
    inputRef.current.value = "";
    ev.preventDefault();
  }

  var chatStates = {
    name: user,
    inputRef: inputRef,
    chatEndRef: chatEndRef,
    handleSubmit: handleSubmit,
    chatLog: chatLog,
  };

  return (
    <div className={props.className}>
      <div className="lobby">
        <h1>Lobby</h1>
        <div className="lobbyctn">
          <Settings />
          <GameLog chatStates={chatStates} />
        </div>
      </div>
    </div>
  );
};

const styledLobby = styled(Lobby)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    height: 10%;
    background-color: ${(props) => props.theme.colors.lightShade};
    color: ${(props) => props.theme.colors.darkShade};
  }
  .lobby {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 40vw;
    height: 75vh;
    background-color: ${(props) => props.theme.colors.darkShade};
  }
  .lobbyctn {
    height: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }
`;

export default styledLobby;
