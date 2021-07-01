import React, { useState, useRef, useEffect, createContext } from "react";
import styled from "styled-components";
import StyledHand from "../assets/playingcards/Hand";
import StyledCard from "../assets/playingcards/Card";

var temphand = ["Club1", "Diamond2", "Heart3", "Heart1"];

function LiarUI(props) {
  const [hand, sethand] = useState(props.G.hand[props.ctx.currentPlayer]);
  const [showPopup, setPopup] = useState(false);
  const [suit, setsuit] = useState(undefined);
  const [staged, setstaged] = useState([]);
  const [draghand, setdraghand] = useState(hand);
  const [dragging, setDragging] = useState("false");
  var dragItem = useRef();
  var dragNode = useRef();

  //Drag Effect
  const handleDragstart = (event, params) => {
    console.log("Drag starting");
    dragItem.current = params;
    dragNode.current = event.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setDragging(true);
  };
  const handleDragEnd = (ev) => {
    setDragging(false);
    sethand(draghand);

    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
    console.log("Drag ended");
  };

  function handleDragEnter(ev, params) {
    if (
      params.id == "card" &&
      params.onhand &&
      dragItem.current.pos !== params.pos
    ) {
      ev.target.style.cursor = "pointer";
      console.log("Entered new Handcard");
      //Put card into target position and
      setdraghand((oldhand) => {
        var newhand = oldhand;
        newhand.splice(
          params.pos,
          0,
          newhand.splice(dragItem.current.pos, 1)[0]
        );
        dragItem.current = params;
        return newhand;
      });
    } else if (params.id == "stack") {
      console.log("Stack entered");
      dragItem.current = params;
    }
  }
  function handleDragLeave(ev, params) {
    //Do nothing
  }
  function handleCardClick(ev, params) {
    if (staged.indexOf(params.pos) == -1) {
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
    if (showPopup == true) {
      var nextplayer = (props.ctx.playOrderPos + 1) % props.ctx.numPlayers;
      setPopup(false);
      var params = { ids: staged, suit: suit };
      props.moves.playCard(params);
      sethand(props.G.hand[nextplayer]);
    }
  }, [suit]);
  useEffect(() => {
    console.log(hand);
  }, [hand]);
  function playCardButton() {
    if (staged.length == 0) {
      console.log("You have to select Cards to Play");
    } else {
      if (props.G.lastSuit == undefined) {
        console.log("You have to name a Suit");
        setPopup(true);
      } else {
        var nextplayer = (props.ctx.playOrderPos + 1) % props.ctx.numPlayers;
        var params = { ids: staged, suit: "Diamond" };
        props.moves.playCard(params);
        sethand(props.G.hand[nextplayer]);
      }
    }
    setstaged([]);
  }

  return (
    <div className={props.className}>
      <StyledFrameWork
        gameprops={props}
        handleDragEnter={handleDragEnter}
        handleDragstart={handleDragstart}
        handleDragEnd={handleDragEnd}
        handleDragLeave={handleDragLeave}
        stack={props.G.stack}
        showPopup={showPopup}
        lastSuit={props.G.lastSuit}
        setsuit={setsuit}
      />
      <StyledActionBar
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
              staged={staged}
              handleDragEnter={handleDragEnter}
              handleDragstart={handleDragstart}
              handleDragEnd={handleDragEnd}
              handleDragLeave={handleDragLeave}
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
  display: table-cell;
  grid-row: 1/2;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
const Button = (props) => (
  <div className={props.className} onClick={props.onClick}>
    <nobr>{props.children}</nobr>
  </div>
);
const StyledButton = styled(Button)`
  color: ${(props) => (props.color == "secDark" ? props.theme.white : "black")};
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
const Settings = (props) => (
  <div className={props.className}>
    <StyledHeader>Settings</StyledHeader>
    <ul>
      <li>
        <StyledButton
          color="primary"
          onClick={(ev) => props.gameprops.moves.drawCard()}
        >
          Restart
        </StyledButton>
      </li>
      <li>
        <StyledButton color="primary">History</StyledButton>
      </li>
      <li>
        <StyledButton color="primary">Options</StyledButton>
      </li>
      <li>
        <StyledButton color="primary">Give Up!</StyledButton>
      </li>
    </ul>
  </div>
);
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
    align-items: center;
    background-color: ${(props) => props.theme.secDark};
    list-style: none;
    box-shadow: inset -16px 0px 16px rgba(0, 0, 0, 0.05),
      inset -8px 0px 8px rgba(0, 0, 0, 0.1);
  }
  li {
    margin-top: 1em;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
`;
const LogBlock = (props) => (
  <div className={props.className}>
    <div className="author">Horst:</div>
    <p className="content">{props.children}</p>
  </div>
);
const StyledLogBlock = styled(LogBlock)`
  display: flex;
  justify-content: space-between;
  font-family: ${(props) => props.theme.textFont};
  font-size: 0.8em;
  padding: 0 0.6em;
  background-color: ${(props) => props.theme.blue};
  border-radius: 0.2em;
  width: 80%;
  .author {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content {
  }
`;
const GameLog = (props) => (
  <div className={props.className}>
    <StyledHeader>Gamelog</StyledHeader>
    <div className="log">
      <StyledLogBlock>Hello There</StyledLogBlock>
    </div>
    <form className="ipt-frm">
      <input type="text"></input>
    </form>
  </div>
);
const StyledGameLog = styled(GameLog)`
  grid-column: 6/8;
  height: 100%;
  background: ${(props) => props.theme.secDark};
  display: grid;
  grid-template-rows: 10% 75% 15%;
  .log {
    grid-row: 2/3;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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
    border-radius: 10px;
    width: 85%;
    height: 65%;
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
      <StyledButton color="primary" onClick={() => props.setsuit("Diamond")}>
        Diamond
      </StyledButton>
      <StyledButton color="primary" onClick={() => props.setsuit("Spade")}>
        Spade
      </StyledButton>
      <StyledButton color="primary" onClick={() => props.setsuit("Heart")}>
        Heart
      </StyledButton>
      <StyledButton color="primary" onClick={() => props.setsuit("Club")}>
        Club
      </StyledButton>
    </div>
  );
};
const StyledPopup = styled(Popup)`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.secDark};
  font-size: 0.5em;
  padding: 0 1em;
`;

const GameBoard = (props) => {
  function PopUpdecider(props) {
    if (props.showPopup) {
      return <StyledPopup setsuit={props.setsuit} />;
    } else if (props.stack.length > 0) {
      return <StyledCard id={`${props.lastSuit}1`} staged={[]} dummy={true} />;
    } else {
      return <div>Nothing</div>;
    }
  }

  return (
    <div className={props.className}>
      <div
        className="stack"
        onDragEnter={(ev) => props.handleDragEnter(ev, { id: "stack" })}
        onDragLeave={(ev) => props.handleDragLeave(ev, { id: "stack" })}
      >
        <PopUpdecider
          stack={props.stack}
          showPopup={props.showPopup}
          lastSuit={props.lastSuit}
          setsuit={props.setsuit}
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
    height: 50%;
    width: 20%;
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
    <StyledSettings gameprops={props.gameprops} />
    <StyledGameBoard
      handleDragstart={props.handleDragstart}
      handleDragEnd={props.handleDragEnd}
      handleDragEnter={props.handleDragEnter}
      handleDragLeave={props.handleDragLeave}
      stack={props.stack}
      showPopup={props.showPopup}
      lastSuit={props.lastSuit}
      setsuit={props.setsuit}
    />
    <StyledGameLog />
  </div>
);
const StyledFrameWork = styled(FrameWork)`
  margin-top: 3rem;
  height: 50vh;
  background: ${(props) => props.theme.green};
  display: grid;
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
    props.position == "left" ? "5px 0px 0px 0px" : "0px 5px 0px 0px"};
  box-shadow: ${(props) =>
    props.position == "left"
      ? "inset 4px 4px 4px rgba(0, 0, 0, 0.15), inset 2px 2px 2px rgba(0, 0, 0, 0.2), inset 1px 1px 1px rgba(0, 0, 0, 0.25)"
      : "inset -4px 4px 4px rgba(0, 0, 0, 0.15), inset -2px 2px 2px rgba(0, 0, 0, 0.2), inset -1px 1px 1px rgba(0, 0, 0, 0.25)"};
  width: 15vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;
const HandArea = (props) => (
  <div className={props.className}>{props.children}</div>
);
const StyledHandArea = styled(HandArea)`
  height: 8em;
  width: 50vw;
  background-color: ${(props) => props.theme.green};
  display: flex;
  justify-content: space-around;
`;
const ActionBar = (props) => (
  <div className={props.className}>
    <StyledButtonBox position="left">
      <StyledButton
        color="secDark"
        onClick={() => {
          props.gameprops.moves.drawCard();
          props.sethand(props.gameprops.G.hand[0]);
        }}
      >
        Draw
      </StyledButton>
      <StyledButton color="secDark">Aktion</StyledButton>
      <StyledButton color="secDark" onClick={() => props.playCardButton()}>
        Play Cards
      </StyledButton>
    </StyledButtonBox>
    <StyledHandArea>{props.children}</StyledHandArea>
    <StyledButtonBox position="right">
      <StyledButton color="secDark">Aktion</StyledButton>
      <StyledButton color="secDark">Aktion</StyledButton>
      <StyledButton color="secDark" onClick={() => props.callOut()}>
        Call
      </StyledButton>
    </StyledButtonBox>
  </div>
);
const StyledActionBar = styled(ActionBar)`
  display: flex;
  justify-content: center;
`;

export default StyledLiarUI;
