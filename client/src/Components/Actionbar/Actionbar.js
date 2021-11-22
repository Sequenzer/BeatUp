import React from "react";
import styled from "styled-components";
import { StyledBtn as Button } from "../utils/Basic-Components";
import ButtonBox from "./Buttonbox";
import HandArea from "./Handarea";

//Example set of 10 Cards
const temphand = [
  { suit: "Clover", value: "A" },
  { suit: "Diamond", value: "2" },
  { suit: "Heart", value: "3" },
  { suit: "Pike", value: "4" },
  { suit: "Clover", value: "5" },
  { suit: "Diamond", value: "6" },
  { suit: "Heart", value: "7" },
  { suit: "Pike", value: "8" },
  { suit: "Clover", value: "9" },
  { suit: "Diamond", value: "10" },
];

const ActionBar = (props) => {
  const [hand, setHand] = React.useState(temphand);
  const handsize = hand.length;

  return (
    <div className={props.className}>
      <ButtonBox position="left">
        <Button color="secDark">Draw</Button>
        <Button color="secDark">Aktion</Button>
        <Button color="secDark">Play Cards</Button>
      </ButtonBox>
      <HandArea hand={hand} handsize={handsize}>
        {props.children}
      </HandArea>
      <ButtonBox position="right">
        <Button color="secDark">Aktion</Button>
        <Button color="secDark">Aktion</Button>
        <Button color="secDark">Call</Button>
      </ButtonBox>
    </div>
  );
};
const StyledActionBar = styled(ActionBar)`
  display: flex;
  justify-content: center;
`;

export default StyledActionBar;
