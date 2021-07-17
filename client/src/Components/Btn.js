import React from "react";
import styled from "styled-components";

const Btn = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

const styledBtn = styled(Btn)`
  font-family: ${(props) => props.theme.titleFont};
  background-color: ${(props) => props.theme.primary};
  flex: 0 0 auto;
  margin-right: 1.5vw;
  height: 1.5rem;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), 0px 2px 2px rgba(0, 0, 0, 0.2),
    0px 4px 4px rgba(0, 0, 0, 0.15), 0px 8px 8px rgba(0, 0, 0, 0.1),
    0px 16px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding: 0 0.8em;
  border-radius: 0.7rem 0;
  :hover {
    background-color: ${(props) => props.theme.secondary};
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15),
      inset 0px 2px 2px rgba(0, 0, 0, 0.2),
      inset 0px 1px 1px rgba(0, 0, 0, 0.25);
  }
`;

export default styledBtn;
