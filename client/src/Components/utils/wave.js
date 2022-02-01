import React from "react";
import styled from "styled-components";

function Wave(props) {
  return (
    <svg id="visual" viewBox="0 0 8000 500" className={props.className}>
      <defs>
        <symbol id="wave">
          <path
            d="M0 279L47.7 294C95.3 309 190.7 339 285.8 320.2C381 301.3 476 233.7 571.2 217.3C666.3 201 761.7 236 857 235C952.3 234 1047.7 197 1143 211.7C1238.3 226.3 1333.7 292.7 1428.8 317.2C1524 341.7 1619 324.3 1714.2 326.3C1809.3 328.3 1904.7 349.7 1952.3 360.3L2000 371L2000 501L1952.3 501C1904.7 501 1809.3 501 1714.2 501C1619 501 1524 501 1428.8 501C1333.7 501 1238.3 501 1143 501C1047.7 501 952.3 501 857 501C761.7 501 666.3 501 571.2 501C476 501 381 501 285.8 501C190.7 501 95.3 501 47.7 501L0 501Z"
            strokeLinecap="round"
            strokeLinejoin="miter"
          ></path>
        </symbol>
      </defs>
      <use xlinkHref="#wave" x="0" y="0" />
      <use
        xlinkHref="#wave"
        x="1"
        y="0"
        transform="translate(4000) scale(-1,1)"
      />
      <use xlinkHref="#wave" x="3998" y="0" />
      <use
        xlinkHref="#wave"
        x="1"
        y="0"
        transform="translate(8000) scale(-1,1)"
      />
    </svg>
  );
}

const styledWave = styled(Wave)`
  path {
    fill: ${(props) => props.theme.lightShade};
  }
`;

export default styledWave;
