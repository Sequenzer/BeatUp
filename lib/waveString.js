//Random Wave function
function createSegStr(
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
    segStr += createSegStr(height, width, nOfextrema, x, y);

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
    segStr += createSegStr(height, width, nOfextrema, x, y);
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

export default createSegStr;
