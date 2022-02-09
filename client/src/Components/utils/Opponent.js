import React from "react";
import styled from "styled-components";

function Opponent(props) {
  return (
    <svg height={props.height} viewBox="0 0 47 65" className={props.className}>
      <path
        d="M3.29824 32.3863C10.7193 23.0686 37.6208 23.068 44.1141 32.3863C50.6074 41.7045 44.1141 65 44.1141 65H3.29824C3.29824 65 -4.1228 41.7039 3.29824 32.3863Z"
        fill={props.color}
      />
      <ellipse
        cx="23.2421"
        cy="23.068"
        rx="14.3783"
        ry="10.7159"
        fill="#FEFEF5"
      />
      <path
        d="M27.2413 22.0634H20.1846L20.3862 21.6583H27.0397L27.2413 22.0634Z"
        className="glasses"
        stroke-width="0.5"
      />
      <path
        d="M4.45833 14.9747C4.8616 15.7848 4.86157 16.7975 6.0713 16.7975C7.28103 16.7975 39.9437 18.4177 40.9518 17.4051C41.9599 16.3924 43.1696 13.7595 42.1615 14.1646C41.1534 14.5696 34.9031 14.1646 33.6934 13.557C32.4837 12.9494 33.2901 1 32.0804 1C30.8706 1 26.2334 4.8481 23.4107 4.64557C20.588 4.44304 19.1766 1.20253 17.362 1.81013C15.5474 2.41772 13.5312 12.5443 12.7248 13.557C11.9184 14.5696 6.27287 13.7595 5.66806 13.557C5.06325 13.3544 4.05506 14.1646 4.45833 14.9747Z"
        fill={props.color}
        stroke={props.color}
        stroke-width="0.5"
      />
      <path
        d="M13.4075 23.2596C12.9233 22.5363 13.1654 20.1251 13.4075 19.884C13.6495 19.6429 20.429 20.3662 20.9132 20.6073C21.3974 20.8484 21.1554 23.5007 20.9132 23.7419C20.671 23.983 13.8917 23.983 13.4075 23.2596Z"
        className="glasses"
        stroke-width="0.5"
      />
      <path
        d="M33.8171 23.2596C34.3013 22.5363 34.0592 20.1251 33.8171 19.884C33.5751 19.6429 26.7956 20.3662 26.3114 20.6073C25.8272 20.8484 26.0692 23.5007 26.3114 23.7419C26.5536 23.983 33.3329 23.983 33.8171 23.2596Z"
        className="glasses"
        stroke-width="0.5"
      />
    </svg>
  );
}

const StyledOpponent = styled(Opponent)`
  .glasses {
    fill: ${(props) => props.theme.darkShade};
  }
  filter: ${(props) =>
    props.active
      ? `drop-shadow(0px 0px 1em ${props.theme.darkAccent})`
      : props.theme.shadowFilter};
`;

export default StyledOpponent;
