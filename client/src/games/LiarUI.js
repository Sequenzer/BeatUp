import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import StyledHand from "../assets/playingcards/Hand";
import StyledCard from "../assets/playingcards/Card";
import { io } from "socket.io-client";
import {
  StyledBtn as Button,
  StyledHeader as Header,
} from "../Components/Basic-Components";

//Draggable import
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
gsap.registerPlugin(Draggable);

var temphand = ["Club1", "Diamond2", "Heart3", "Heart1"];

function LiarUI(props) {
  const [hand, sethand] = useState(props.G.hand[props.ctx.currentPlayer]);
  const [showPopup, setPopup] = useState(false);
  const [value, setvalue] = useState(undefined);
  const [staged, setstaged] = useState([]);
  const [barwidth, setwidth] = useState(undefined);
  const [selectedOption, setSelected] = useState(undefined);
  const [DragObjID, setDragObjID] = useState(undefined);

  var DragObject = useRef(null);
  const DragContainer = useRef(null);

  useEffect((event) => {
    Draggable.create(".card", {
      type: "x,y",
      container: DragContainer.current,
      onDragStart: function () {
        console.log(this.target.id);
        setDragObjID(this.target.id);
        sethand((old) => {
          console.log(old, old.indexOf(this.target.id));
          var newhand = old.slice();
          newhand.splice(old.indexOf(this.target.id), 1);
          console.log(newhand);

          return newhand;
        });
      },
    });
  }, []);

  const handleOptionClick = (ev, params) => {
    if (selectedOption === params.value) {
      setSelected(undefined);
    } else {
      setSelected(params.value);
    }
  };

  function getNumberOfCard(card) {
    var r = /\d+/;
    return parseInt(card.match(r)[0]);
  }

  function handleCardClick(ev, params) {
    if (staged.indexOf(params.pos) === -1) {
      setstaged((old) => {
        var newstaged = [...old];
        newstaged.push(params.pos);
        return newstaged;
      });
    } else {
      setstaged((old) => {
        var newstaged = [...old];
        newstaged.splice(old.indexOf(params.pos), 1);
        return newstaged;
      });
    }
  }
  useEffect(() => {
    if (showPopup === true) {
      var nextplayer = (props.ctx.playOrderPos + 1) % props.ctx.numPlayers;
      setPopup(false);
      var params = { ids: staged, value: value };
      props.moves.playCard(params);
      sethand(props.G.hand[nextplayer]);
      setstaged([]);
    }
  }, [value]);
  function playCardButton() {
    if (staged.length === 0) {
      console.log("You have to select Cards to Play");
    } else {
      if (props.G.lastValue === undefined) {
        console.log("You have to name a Suit");
        setPopup(true);
      } else {
        var nextplayer = (props.ctx.playOrderPos + 1) % props.ctx.numPlayers;
        var params = { ids: staged };
        props.moves.playCard(params);
        sethand(props.G.hand[nextplayer]);
        setstaged([]);
      }
    }
  }

  //Size Cards
  //const actionbar = useRef();
  useEffect(() => {
    if (barwidth) {
      console.log(barwidth.slice(0, -2));
    }
  }, [barwidth]);

  return (
    <div className={props.className} ref={DragContainer}>
      <StyledFrameWork
        gameprops={props}
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
        stack={props.G.stack}
        showPopup={showPopup}
        lastSuit={props.G.lastSuit}
        setvalue={setvalue}
        value={value}
      />
      <StyledActionBar
        setwidth={setwidth}
        gameprops={props}
        sethand={sethand}
        playCardButton={playCardButton}
        callOut={props.moves.callOut}
      >
        {hand.map((card, i) => {
          return (
            <StyledCard
              key={i}
              id={card}
              pos={i}
              barwidth={barwidth}
              inHand={hand.indexOf(card) !== -1}
              DragObjID={DragObjID}
              handsize={hand.length}
              staged={staged}
              cardwidth={130}
              offset={60}
              handleClick={handleCardClick}
              onhand={true}
            />
          );
        })}
      </StyledActionBar>
    </div>
  );
}

const StyledLiarUI = styled(LiarUI)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
function Settings(props) {
  return (
    <div className={props.className}>
      <Header>Settings</Header>
      <ul>
        <li className="restart">
          <Button
            active={true}
            color="primary"
            onClick={(ev) => props.handleOptionClick(ev, { value: "restart" })}
          >
            Restart
          </Button>
          {props.selected === "restart" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
            </ul>
          ) : null}
        </li>

        <li className="history">
          <Button
            color="primary"
            onClick={(ev) => props.handleOptionClick(ev, { value: "history" })}
          >
            History
          </Button>
          {props.selected === "history" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
            </ul>
          ) : null}
        </li>
        <li className="options">
          <Button
            color="primary"
            onClick={(ev) => props.handleOptionClick(ev, { value: "options" })}
          >
            Options
          </Button>
          {props.selected === "options" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
            </ul>
          ) : null}
        </li>
        <li className="giveup">
          <Button
            color="primary"
            onClick={(ev) => props.handleOptionClick(ev, { value: "giveup" })}
          >
            Give Up!
          </Button>
          {props.selected === "giveup" ? (
            <ul className="ctx-menu">
              <li className="ctx-item">Horst</li>
              <li className="ctx-item">Horst</li>
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
  .ctx-item {
    font-family: ${(props) => props.theme.textFont};
    margin-top: 0.2em;
    margin-bottom: 0;
    background-color: ${(props) => props.theme.blue};
    width: 90%;
    border-radius: 2px;
  }
  .ctx-item:first-child {
    margin-top: 0.5em;
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

//How?
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    observer.observe(ref.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

const GameLog = (props) => {
  const [chatLog, setChatLog] = useState([]);
  //const [member, setMember] = useState(["Horst","Peter"]);
  const [name] = useState("Horst");
  const [test, setTest] = useState(false);

  const inputRef = useRef(null);
  const chatEndRef = useRef(null);
  // var scrolledDown = useOnScreen(chatEndRef);

  function scrollToBottom() {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    //if (scrolledDown) {
    scrollToBottom();
    //}
  }, [chatLog]);

  function handleSubmit(ev) {
    console.log("submit", inputRef.current.value);
    if (inputRef.current.value !== "") {
      if (test) {
        pushMessage("Horst", inputRef.current.value);
        setTest(!test);
      } else {
        pushMessage("Peter", inputRef.current.value);
        setTest(!test);
      }
    }
    inputRef.current.value = "";
    ev.preventDefault();
  }
  function pushMessage(author, value) {
    setChatLog([...chatLog, { author, value }]);
  }
  return (
    <div className={props.className}>
      <Header>Gamelog</Header>
      <ul className="log">
        {chatLog.map((ele, i) => (
          <StyledLogBlock
            key={i}
            author={ele.author}
            isSelf={name === ele.author}
          >
            {ele.value}
          </StyledLogBlock>
        ))}
        <li ref={chatEndRef} />
      </ul>
      <form className="ipt-frm" onSubmit={(ev) => handleSubmit(ev)}>
        <input type="text" ref={inputRef} placeholder={"Put it in!"}></input>
      </form>
    </div>
  );
};
const StyledGameLog = styled(GameLog)`
  grid-column: 6/8;
  grid-row: 1/2;
  background: ${(props) => props.theme.secDark};
  display: grid;
  grid-template-rows: 10% 75% 15%;
  .log {
    overflow-y: scroll;
    grid-row: 2/3;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ${(props) => props.theme.secondary};
    list-style: none;
    box-shadow: inset 1px 0px 1px rgba(0, 0, 0, 0.25),
      inset 2px 0px 2px rgba(0, 0, 0, 0.2),
      inset 4px 0px 4px rgba(0, 0, 0, 0.15),
      inset 8px 0px 8px rgba(0, 0, 0, 0.1),
      inset 16px 0px 16px rgba(0, 0, 0, 0.05),
      inset -1px 0px 1px rgba(0, 0, 0, 0.25),
      inset -2px 0px 2px rgba(0, 0, 0, 0.2),
      inset -4px 0px 4px rgba(0, 0, 0, 0.15),
      inset -8px 0px 8px rgba(0, 0, 0, 0.1),
      inset -16px 0px 16px rgba(0, 0, 0, 0.05);
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
    width: 85%;
    height: 40%;
    box-shadow: inset 0px 16px 16px rgba(0, 0, 0, 0.05),
      inset 0px 8px 8px rgba(0, 0, 0, 0.1),
      inset 0px 4px 4px rgba(0, 0, 0, 0.15),
      inset 0px 2px 2px rgba(0, 0, 0, 0.2),
      inset 0px 1px 1px rgba(0, 0, 0, 0.25);
  }
`;

const Popup = (props) => {
  return (
    <div className={props.className}>
      {Array(9)
        .fill(1)
        .map((ele, id) => (
          <Button
            className="popup-btn"
            key={id + 2}
            color="primary"
            onClick={() => props.setvalue(id + 2)}
          >
            {id + 2}
          </Button>
        ))}
      <Button
        className="popup-btn"
        key={11}
        color="primary"
        onClick={() => props.setvalue(11)}
      >
        Jack
      </Button>
      <Button
        className="popup-btn"
        key={12}
        color="primary"
        onClick={() => props.setvalue(12)}
      >
        Queen
      </Button>
      <Button
        className="popup-btn"
        key={13}
        color="primary"
        onClick={() => props.setvalue(13)}
      >
        King
      </Button>
    </div>
  );
};
const StyledPopup = styled(Popup)`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.secDark};
  font-size: 0.5em;
  padding: 0 1em;
  .popup-btn {
    width: 2.5em;
    text-align: center;
  }
`;

const GameBoard = (props) => {
  function PopUpdecider(props) {
    if (props.showPopup) {
      return <StyledPopup setvalue={props.setvalue} />;
    } else if (props.stack.length > 0) {
      return <div>{props.value}</div>;
    } else {
      return <div>Nothing</div>;
    }
  }

  return (
    <div className={props.className}>
      <div className="stack">
        <PopUpdecider
          value={props.value}
          stack={props.stack}
          showPopup={props.showPopup}
          lastSuit={props.lastSuit}
          setvalue={props.setvalue}
        />
      </div>
    </div>
  );
};
const StyledGameBoard = styled(GameBoard)`
  grid-column: 3/6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .stack {
    color: ${(props) => props.theme.white};
    height: 60%;
    width: 30%;
    border: ${(props) => "1px dashed " + props.theme.white};
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-family: ${(props) => props.theme.textFont};
    font-size: 2em;
  }
`;
const FrameWork = (props) => (
  <div className={props.className}>
    <StyledSettings
      handleOptionClick={props.handleOptionClick}
      gameprops={props.gameprops}
      selected={props.selectedOption}
    />
    <StyledGameBoard
      value={props.value}
      stack={props.stack}
      showPopup={props.showPopup}
      lastSuit={props.lastSuit}
      setvalue={props.setvalue}
    />
    <StyledGameLog />
  </div>
);
const StyledFrameWork = styled(FrameWork)`
  margin-top: 3rem;
  height: 50vh;
  background: ${(props) => props.theme.green};
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: 7.5vw 7.5vw 7.5vw auto 7.5vw 7.5vw 7.5vw;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25),
    0px 16px 16px rgba(0, 0, 0, 0.05);
`;

const ButtonBox = (props) => (
  <div className={props.className}>{props.children}</div>
);
const StyledButtonBox = styled(ButtonBox)`
  background: ${(props) => props.theme.secondary};
  border-radius: ${(props) =>
    props.position === "left" ? "5px 0px 0px 0px" : "0px 5px 0px 0px"};
  box-shadow: ${(props) =>
    props.position === "left"
      ? "inset 4px 4px 4px rgba(0, 0, 0, 0.15), inset 2px 2px 2px rgba(0, 0, 0, 0.2), inset 1px 1px 1px rgba(0, 0, 0, 0.25)"
      : "inset -4px 4px 4px rgba(0, 0, 0, 0.15), inset -2px 2px 2px rgba(0, 0, 0, 0.2), inset -1px 1px 1px rgba(0, 0, 0, 0.25)"};
  width: 15vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
const HandArea = (props) => {
  return <div className={props.className}>{props.children}</div>;
};
const StyledHandArea = styled(HandArea)`
  height: 8em;
  width: 50vw;
  background-color: ${(props) => props.theme.green};
  display: flex;
  justify-content: space-around;
  position: relative;
`;
const ActionBar = (props) => {
  const barRef = useRef();
  useLayoutEffect(() => {
    if (barRef.current) {
      props.setwidth(
        window.getComputedStyle(barRef.current.childNodes[1]).width
      );
    }
  });
  return (
    <div className={props.className} ref={barRef}>
      <StyledButtonBox position="left">
        <Button
          color="secDark"
          onClick={() => {
            props.gameprops.moves.drawCard();
            props.sethand(props.gameprops.G.hand[0]);
          }}
        >
          Draw
        </Button>
        <Button color="secDark">Aktion</Button>
        <Button color="secDark" onClick={() => props.playCardButton()}>
          Play Cards
        </Button>
      </StyledButtonBox>
      <StyledHandArea forwardedRef={props.actionbar}>
        {props.children}
      </StyledHandArea>
      <StyledButtonBox position="right">
        <Button color="secDark">Aktion</Button>
        <Button color="secDark">Aktion</Button>
        <Button color="secDark" onClick={() => props.callOut()}>
          Call
        </Button>
      </StyledButtonBox>
    </div>
  );
};
const StyledActionBar = styled(ActionBar)`
  display: flex;
  justify-content: center;
`;

export default { StyledLiarUI, StyledGameLog, StyledSettings };
