import React from "react";
import styled from "styled-components";

import ActionBar from "../../Components/Actionbar/Actionbar";
import FrameWork from "../../Components/SBLFrame/Framework";

//Draggable import
// import { gsap } from "gsap";
// import Draggable from "gsap/Draggable";
// gsap.registerPlugin(Draggable);

// var temphand = ["Club1", "Diamond2", "Heart3", "Heart1"];

function LiarUI(props) {
  return (
    <div className={props.className}>
      <FrameWork />
      <ActionBar> Temporary Change</ActionBar>
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

export default StyledLiarUI;
