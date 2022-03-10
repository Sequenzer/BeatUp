import styled, { keyframes } from "styled-components";
import { useState } from "react";
import dynamic from "next/dynamic";

import Wave from "components/svg/Wave";

import waveString from "lib/waveString";

var Background = (props) => {
  let height = 250;
  let width = 1000;
  let nOfextrema = 4;

  const [{ wave1, wave2, wave3 }, setWave] = useState({
    wave1: {
      start: waveString(height, width, nOfextrema),
      end: waveString(height, width, nOfextrema),
    },
    wave2: {
      start: waveString(height, width, nOfextrema),
      end: waveString(height, width, nOfextrema),
    },
    wave3: {
      start: waveString(height, width, nOfextrema),
      end: waveString(height, width, nOfextrema),
    },
  });

  return (
    <div className={props.className}>
      <Wave
        height={height}
        width={width}
        n={nOfextrema}
        start={wave1.start}
        end={wave1.end}
        className="first"
      />
      <Wave
        height={height}
        width={width}
        n={nOfextrema}
        start={wave2.start}
        end={wave2.end}
        className="second"
      />
      <Wave
        height={height}
        width={width}
        n={nOfextrema}
        start={wave3.start}
        end={wave3.end}
        className="third"
      />
    </div>
  );
};

const moveY = keyframes`
    0%,100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(5%);
    }
`;

const styledBackground = styled(Background)`
  position: relative;
  width: 110vw;
  left: -10%;
  height: 100%;
  z-index: -1;
  ::after {
    content: "";
    position: absolute;
    background-color: ${(props) => props.theme.colors.lightShade};
    top: 49vh;
    height: 60vh;
    width: 100%;
  }
  svg {
    height: 20vh;
    position: absolute;
    top: 30vh;
    left: 0;
    animation: ${moveY} 9s ease-in-out infinite;
  }
  .first {
    opacity: 0.4;
    animation-delay: 0s;
  }
  .second {
    opacity: 0.6;
    animation-delay: 2s;
  }
  .third {
    opacity: 1;
    animation-delay: 4s;
  }
`;

export default dynamic(() => Promise.resolve(styledBackground), {
  ssr: false,
});
