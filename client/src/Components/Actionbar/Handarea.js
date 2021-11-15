import React from "react";
import styled from "styled-components";

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

export default StyledHandArea;
