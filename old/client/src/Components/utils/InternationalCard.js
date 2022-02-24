//import React and styled components
import React from "react";
import styled from "styled-components";

import { ReactComponent as Wiener } from "../../assets/Own Cards/International/Wiener.svg";
import { ReactComponent as Beer } from "../../assets/Own Cards/International/Beer.svg";
import { ReactComponent as GER } from "../../assets/Own Cards/International/GER.svg";
import { ReactComponent as ESP } from "../../assets/Own Cards/International/ESP.svg";
import { ReactComponent as Paella } from "../../assets/Own Cards/International/Paella.svg";
import { ReactComponent as Sangria } from "../../assets/Own Cards/International/Sangria.svg";
import { ReactComponent as Pelimeni } from "../../assets/Own Cards/International/Pelimeni.svg";
import { ReactComponent as Vodka } from "../../assets/Own Cards/International/Vodka.svg";
import { ReactComponent as RUS } from "../../assets/Own Cards/International/RUS.svg";
import { ReactComponent as Zigarre } from "../../assets/Own Cards/International/Zigarre.svg";
import { ReactComponent as CubaLibre } from "../../assets/Own Cards/International/CubaLibre.svg";
import { ReactComponent as CUB } from "../../assets/Own Cards/International/CUB.svg";
import { ReactComponent as Banku } from "../../assets/Own Cards/International/Banku.svg";
import { ReactComponent as Palmwein } from "../../assets/Own Cards/International/Palmwein.svg";
import { ReactComponent as GHA } from "../../assets/Own Cards/International/GHA.svg";

const StyledIntCard = styled(IntCard).attrs((props) => ({
  height: props.height || props.width * (3.5 / 2.5) || 7,
  width: props.width || props.height * (2.5 / 3.5) || 5,
  sO:
    (1 / 500) * props.width ||
    (1 / 500) * props.height * (2.5 / 3.5) ||
    1 / 500,
  sb:
    (4 / 500) * props.width ||
    (4 / 500) * props.height * (2.5 / 3.5) ||
    4 / 500,
  radius:
    props.radius ||
    props.width * (50 / 500) ||
    props.height * (2.5 / 3.5) * (50 / 500) ||
    0.5,
}))`
  width: ${(props) => props.width}em;
  height: ${(props) => props.height}em;
  border-radius: ${(props) => props.radius}em;
  box-shadow: 0 0 0.5vw 0 rgba(0, 0, 0, 0.5);
  border: ${(props) =>
      props.width * (13 / 500) ||
      (props.height * (2.5 / 3.5) * 13) / 500 ||
      13 / 500}em
    solid #ffffff;
  box-sizing: border-box;
  background-color: ${(props) => props.color || "#fff"};

  svg {
    filter: ${(props) => {
      return `drop-shadow(${props.sO}em ${props.sO}em ${props.sb}em rgba(0, 0, 0, 0.25))`;
    }};
  }
  .middle-background {
    fill: #f5f5f5;
    transform: rotate(45deg);
    transform-origin: center;
    border-radius: ${(props) =>
      props.width / 100 || (props.height * (2.5 / 3.5)) / 100 || 0.1}em;
  }
`;

function IntCard(props) {
  var height = 700;
  var width = 500;
  var flagheight = {
    small: 50.73,
    big: 120,
    text: 60,
  };
  var symbolheight = {
    small: 80,
    big: 240,
    text: 60,
  };
  var padding = {
    top_bottom: width * (40 / 500),
    left_right: width * (45 / 500),
  };
  var flag_logo_spacing = 10;

  return (
    <svg viewBox="0 0 500 700" className={props.className}>
      <g className="up">
        <g className="left">
          <FlagChoice
            country={props.country}
            drink={props.drink}
            x={padding.left_right}
            y={padding.top_bottom}
            height={flagheight.small}
            width={flagheight.small * 1.5}
          />
          <LogoChoice
            country={props.country}
            drink={props.drink}
            x={padding.left_right}
            y={padding.top_bottom + flagheight.small + flag_logo_spacing}
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
        <g className="right">
          <FlagChoice
            country={props.country}
            drink={props.drink}
            x={width - padding.left_right - flagheight.small * 1.5}
            y={padding.top_bottom}
            height={flagheight.small}
            width={flagheight.small * 1.5}
          />
          <LogoChoice
            country={props.country}
            drink={props.drink}
            x={width - padding.left_right - symbolheight.small}
            y={padding.top_bottom + flagheight.small + flag_logo_spacing}
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
      </g>
      <g className="middle">
        <rect
          className="middle-background"
          x={width / 2 - symbolheight.big / 2}
          y={height / 2 - symbolheight.big / 2}
          height={symbolheight.big}
          width={symbolheight.big}
          style={{
            filter: "drop-shadow(0px 0px 3px #000000)",
          }}
        />
        <LogoChoice
          country={props.country}
          drink={props.drink}
          x={width / 2 - symbolheight.big / 2}
          y={height / 2 - symbolheight.big / 2}
          height={symbolheight.big}
          width={symbolheight.big}
        />
      </g>
      <g className="down">
        <g className="left">
          <FlagChoice
            country={props.country}
            drink={props.drink}
            x={padding.left_right}
            y={height - padding.top_bottom - flagheight.small}
            height={flagheight.small}
            width={flagheight.small * 1.5}
          />
          <LogoChoice
            country={props.country}
            drink={props.drink}
            x={padding.left_right}
            y={
              height -
              padding.top_bottom -
              flagheight.small -
              flag_logo_spacing -
              symbolheight.small
            }
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
        <g className="right">
          <FlagChoice
            country={props.country}
            drink={props.drink}
            x={width - padding.left_right - flagheight.small * 1.5}
            y={height - padding.top_bottom - flagheight.small}
            height={flagheight.small}
            width={flagheight.small * 1.5}
          />
          <LogoChoice
            country={props.country}
            drink={props.drink}
            x={width - padding.left_right - symbolheight.small}
            y={
              height -
              padding.top_bottom -
              flagheight.small -
              flag_logo_spacing -
              symbolheight.small
            }
            height={symbolheight.small}
            width={symbolheight.small}
          />
        </g>
      </g>
    </svg>
  );
}

function LogoChoice(props) {
  var drinks = {
    GER: <Beer {...props} />,
    ESP: <Sangria {...props} />,
    RUS: <Vodka {...props} />,
    CUB: <CubaLibre {...props} />,
    GHA: <Palmwein {...props} />,
  };
  var foods = {
    GER: <Wiener {...props} />,
    ESP: <Paella {...props} />,
    RUS: <Pelimeni {...props} />,
    CUB: <Zigarre {...props} />,
    GHA: <Banku {...props} />,
  };
  return props.drink ? drinks[props.country] : foods[props.country];
}

function FlagChoice(props) {
  var flags = {
    GER: <GER {...props} />,
    ESP: <ESP {...props} />,
    RUS: <RUS {...props} />,
    CUB: <CUB {...props} />,
    GHA: <GHA {...props} />,
  };
  return flags[props.country] ? (
    flags[props.country]
  ) : (
    <div>Wrong Country Input!</div>
  );
}

export default StyledIntCard;
