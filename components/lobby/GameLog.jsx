import { useEffect } from "react";
import styled from "styled-components";

const LogBlock = (props) => (
  <li className={props.className}>
    <div className="author">{`${props.author}: `}</div>
    <p className="content">{props.children}</p>
  </li>
);
const StyledLogBlock = styled(LogBlock)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: ${(props) => props.theme.textFont};
  font-size: 0.8em;
  background-color: ${(props) =>
    props.isSelf ? props.theme.chatblue : props.theme.chatgreen};
  border-radius: ${(props) =>
    props.isSelf ? " 0.4em 0 0.4em 0.4em" : "0 0.4em 0.4em 0.4em"};
  max-width: 70%;
  margin-bottom: 0.2em;
  margin-left: 1em;
  margin-right: 1em;

  .content,
  .author {
    font-family: ${(props) => props.theme.textFont};
    margin: 0.4em;
    display: block;
    word-wrap: break-word;
    text-align: left;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .author {
    display: ${(props) => (props.isSelf ? "none" : "block")};
    font-size: 90%;
    margin-bottom: 0;
  }
  align-self: ${(props) => (props.isSelf ? "flex-end" : "flex-start")};
`;

const GameLog = (props) => {
  function scrollToBottom() {
    props.chatStates.chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    scrollToBottom();
  }, [props.chatStates.chatLog]);

  return (
    <div className={props.className}>
      <ul className="log">
        {props.chatStates.chatLog.map((ele, i) => (
          <StyledLogBlock
            key={i}
            author={ele.author}
            isSelf={props.chatStates.name === ele.author}
          >
            {ele.value}
          </StyledLogBlock>
        ))}
        <li ref={props.chatStates.chatEndRef} />
      </ul>
      <form
        className="ipt-frm"
        onSubmit={(ev) => props.chatStates.handleSubmit(ev)}
      >
        <input
          type="text"
          ref={props.chatStates.inputRef}
          placeholder={"Type here!"}
        ></input>
      </form>
    </div>
  );
};
const StyledGameLog = styled(GameLog)`
  width: 40%;
  height: 100%;
  display: grid;
  grid-template-rows: 75% 15%;
  .log {
    overflow-y: scroll;
    grid-row: 1/3;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px 0 5px 0;

    background-color: ${(props) => props.theme.colors.lightShade};
    list-style: none;
    box-shadow: inset 1px 0px 1px rgba(0, 0, 0, 0.25),
      inset 2px 0px 2px rgba(0, 0, 0, 0.2),
      inset 4px 0px 4px rgba(0, 0, 0, 0.15),
      inset 8px 0px 8px rgba(0, 0, 0, 0.1),
      inset 16px 0px 16px rgba(0, 0, 0, 0.05);
    ::-webkit-scrollbar {
      width: 0.5em;
    }
    ::-webkit-scrollbar-track {
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: ${(props) => props.theme.secDark};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${(props) => props.theme.secLight};
    }
  }
  .log li:first-child {
    margin-top: 0.5em;
  }
  .ipt-frm {
    grid-row: 3/4;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  input {
    background-color: ${(props) => props.theme.secondary};
    outline: none;
    font-size: 0.8em;
    padding: 0.4em;
    border: 0;
    border-radius: 5px;
    width: 100%;
    height: 40%;
    box-shadow: inset 0px 16px 16px rgba(0, 0, 0, 0.05),
      inset 0px 8px 8px rgba(0, 0, 0, 0.1),
      inset 0px 4px 4px rgba(0, 0, 0, 0.15),
      inset 0px 2px 2px rgba(0, 0, 0, 0.2),
      inset 0px 1px 1px rgba(0, 0, 0, 0.25);
  }
`;

export default StyledGameLog;
