import React from "react";
import styled from "styled-components";

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

export default StyledButtonBox;
