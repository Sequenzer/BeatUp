import React from "react";
import styled from "styled-components";

function Wave(props) {
  let height = 500;
  let width = 1000;
  let nOfextrema = 2;

  function createSegStr(hscale, vscale) {
    let segStr = "C";
    segStr += `${vscale * width} ${height * (1 - hscale)}`;
    segStr += ` ${vscale * width} ${height * (1 - hscale)}`;
    segStr += ` ${width} ${height}`;

    return segStr;
  }

  function createSegStr2(xStart = 0, yStart = height / 2) {
    let intervall = width / (2 * nOfextrema);
    let x = xStart === 0 ? intervall : xStart + 2 * intervall;
    let y = height * Math.random() * 0.8;
    let offv = intervall * Math.random();
    let offh = y + Math.random() * Math.min(Math.abs(y - height), y);
    let segStr = "";

    if (xStart === 0) {
      segStr += " S"; // start curve
      segStr += ` ${parseInt(x - offv)} ${parseInt(offh)}`; // define offsetpoint
      segStr += ` ${parseInt(x)} ${parseInt(y)}`; // endpoint
      segStr += createSegStr2(x, y);

      var stringarr = segStr.split(" ");

      let oldoffv = width - parseFloat(stringarr[stringarr.length - 11]);
      let oldoffh = height - parseFloat(stringarr[stringarr.length - 10]);
      console.log(stringarr, oldoffh, oldoffv);

      segStr = ` ${parseInt(x)} ${parseInt(y)}` + segStr; // endpoint of first segment
      segStr = ` ${parseInt(x - offv)} ${parseInt(offh)}` + segStr; // define offsetpoint of endpoint
      segStr = ` ${parseInt(xStart + oldoffv)} ${parseFloat(oldoffh)}` + segStr; // define offsetpoint of startpoint
      segStr = " C" + segStr;

      segStr = `M ${parseInt(xStart)} ${parseInt(height / 2)}` + segStr;

      return segStr;
    }

    if (x < width) {
      segStr += " S"; // start curve
      segStr += ` ${x - offv} ${offh}`; // define offsetpoint
      segStr += ` ${x} ${y}`; // endpoint
      segStr += createSegStr2(x, y);
      return segStr;
    } else {
      segStr += " S"; // start curve
      segStr += ` ${width - offv / 2} ${offh}`; // define offsetpoint
      segStr += ` ${width} ${height / 2}`; // endpoint
      segStr += ` L ${width} ${height}`; // Line bottom right
      segStr += ` L ${0} ${height}`; // Line bottom right
      segStr += " Z";

      return segStr;
    }
  }

  return (
    <svg id="visual" viewBox="0 0 2000 500" className={props.className}>
      <defs>
        <symbol id="wave">
          <path
            d={`${createSegStr2()}`}
            fill={props.fill ? props.fill : "#fefef5"}
            strokeLinecap="round"
            strokeLinejoin="miter"
          ></path>
        </symbol>
      </defs>
      <use xlinkHref="#wave" x="0" y="0" />
      <use xlinkHref="#wave" x="1000" y="0" />
      {/* <use
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
      /> */}
    </svg>
  );
}

const styledWave = styled(Wave)`
  /* grid-column: 1/5; */
  height: 40vh;
  path {
    fill: ${(props) => props.theme.lightShade};
  }
`;

export default styledWave;
