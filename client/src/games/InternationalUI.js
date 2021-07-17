//import React and styled components
import React from "react";
import styled from "styled-components";

function InternationalUI(props) {
  return <div className={props.className}>Dummy</div>;
}

const StyledInternationalUI = styled(InternationalUI)`
  background-color: red;
`;

export default StyledInternationalUI;
