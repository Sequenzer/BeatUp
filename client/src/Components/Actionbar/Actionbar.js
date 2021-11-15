import React from "react";
import styled from "styled-components";
import { StyledBtn as Button } from "../utils/Basic-Components";
import ButtonBox from "./Buttonbox";
import HandArea from "./Handarea";

const ActionBar = (props) => {
  return (
    <div className={props.className}>
      <ButtonBox position="left">
        <Button color="secDark">Draw</Button>
        <Button color="secDark">Aktion</Button>
        <Button color="secDark">Play Cards</Button>
      </ButtonBox>
      <HandArea>{props.children}</HandArea>
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
