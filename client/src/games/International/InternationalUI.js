//import React and styled components
import React from "react";
import styled from "styled-components";

import Card from "../../Components/utils/CardComponent";
import IntCard from "../../Components/utils/InternationalCard";

var suits = ["Clover", "Diamond", "Heart", "Pike"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "B", "Q", "K"];

var genders = ["Drink", "Food"];
var countries = ["GER", "ESP", "RUS", "CUB", "GHA"];
var colors = {
  GER: "#97D269",
  ESP: "#FFFF82",
  RUS: "#2E0971",
  CUB: "#F44708",
  GHA: "#9747ff",
};
var colorGER = "#97D269";

function InternationalUI(props) {
  return (
    <div className={props.className}>
      {genders.map((gender, i) => {
        return countries.map((country, j) => {
          return (
            <IntCard
              key={`${i}+${j}`}
              width={9}
              color={colors[country]}
              country={country}
              drink={gender == "Drink"}
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
