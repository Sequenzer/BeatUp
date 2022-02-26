import styled, { keyframes } from "styled-components";

function Wave(props) {
  let height = props.height;
  let width = props.width;
  let nOfextrema = props.n;

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
    <svg
      id="visual"
      viewBox={`0 0 ${props.width} ${props.height}`}
      maxWidth="100%"
      width="auto"
      height="auto"
      maxHeight="110%"
      preserveAspectRatio="none"
      className={props.className}
    >
      <defs>
        <symbol id="wave">
          <path
            d={`${createSegStr2()}`}
            strokeLinecap="round"
            strokeLinejoin="miter"
          ></path>
        </symbol>
      </defs>
      <use xlinkHref="#wave" x="0" y="0" />
    </svg>
  );
}

const wavy = keyframes`
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(1vh) rotate(0.5deg);
  }
`;

const styledWave = styled(Wave)`
  filter: ${(props) => props.theme.filters.sharp};
  path {
    fill: ${(props) => props.theme.colors.lightShade};
  }
`;

export default styledWave;
