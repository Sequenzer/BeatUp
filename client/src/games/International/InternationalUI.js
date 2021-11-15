//import React and styled components
import React from "react";
import styled from "styled-components";

import Card from "../../Components/utils/CardComponent";

var suits = ["Clover", "Diamond", "Heart", "Pike"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function InternationalUI(props) {
  return (
    <div className={props.className}>
      {values.map((value, i) => {
        return suits.map((suit, j) => {
          console.log(value, suit);
          return (
            <Card
              key={"" + i + "" + j}
              suit={suit}
              value={value}
              height={700}
            />
          );
        });
      })}
    </div>
  );
}

const StyledInternationalUI = styled(InternationalUI)`
  background-color: green;
  padding: 0.5rem;
  font-family: ${(props) => props.theme.cardFont};
`;

export default StyledInternationalUI;
