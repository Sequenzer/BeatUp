import styled, { keyframes } from "styled-components";
import waveString from "lib/waveString";

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
      <path d={props.start} strokeLinecap="round" strokeLinejoin="miter"></path>
    </svg>
  );
}

const styledWave = styled(Wave).attrs((props) => {
  let path1 = 'path("' + props.start + '")';
  let path2 = 'path("' + props.end + '")';

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
