import React from "react";
import styled from "styled-components";
import { StyledBtn as Button } from "../utils/Basic-Components";
import ButtonBox from "./Buttonbox";
import HandArea from "./Handarea";

const ActionBar = (props) => {
  const handsize = props.hand.length;
  return (
    <div className={props.className}>
      <ButtonBox position="left">
        <Button color="secDark">Draw</Button>
        <Button color="secDark">Aktion</Button>
        <Button color="secDark">Play Cards</Button>
      </ButtonBox>
      <HandArea
        hand={props.hand}
        setHand={props.setHand}
        handsize={handsize}
        cardwidth={props.cardwidth}
        handareaRef={props.actionbarRef}
      >
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
