import styled, { keyframes } from "styled-components";

import Wave from "components/svg/Wave";

var Background = (props) => {
  return (
    <div className={props.className}>
      <Wave height={250} width={1000} n={4} className="first" />
      <Wave height={250} width={1000} n={4} className="second" />
      <Wave height={250} width={1000} n={4} className="third" />
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

export default styledBackground;
