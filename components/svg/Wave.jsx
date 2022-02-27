import styled, { keyframes } from "styled-components";

//Random Wave function
function createSegStr2(
  height,
  width,
  nOfextrema,
  xStart = 0,
  yStart = height / 2
) {
  let intervall = width / (2 * nOfextrema);
  let x = xStart === 0 ? intervall : xStart + 2 * intervall;
  let y = height * Math.random() * 0.8;
  let offv = intervall * Math.min(Math.random() + 0.1, 1);
  let offh =
    y + (Math.min(0.1 + Math.random()), 1) * Math.min(Math.abs(y - height), y);
  let segStr = "";

  if (xStart === 0) {
    segStr += " S"; // start curve
    segStr += ` ${parseInt(x - offv)} ${parseInt(offh)}`; // define offsetpoint
    segStr += ` ${parseInt(x)} ${parseInt(y)}`; // endpoint
    segStr += createSegStr2(height, width, nOfextrema, x, y);

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
    segStr += createSegStr2(height, width, nOfextrema, x, y);
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

function Wave(props) {
  let height = props.height;
  let width = props.width;
  let nOfextrema = props.n;

  return (
    <svg
      id="visual"
      viewBox={`0 0 ${props.width} ${props.height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      className={props.className}
    >
      <path
        d={`${createSegStr2(height, width, nOfextrema)}`}
        strokeLinecap="round"
        strokeLinejoin="miter"
      ></path>
    </svg>
  );
}

const styledWave = styled(Wave).attrs((props) => {
  let path1 =
    'path("' + createSegStr2(props.height, props.width, props.n) + '")';
  let path2 =
    'path("' + createSegStr2(props.height, props.width, props.n) + '")';

  return {
    wavy: keyframes`
  0%,100% {
    d: ${path1};
  }
  50% {
    d: ${path2};
  }
`,
    moveY: keyframes`
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }`,
  };
})`
  path {
    fill: ${(props) => props.theme.colors.lightShade};
    animation: ${(props) => props.wavy} 10s ease-in-out infinite;
  }
`;

export default styledWave;
