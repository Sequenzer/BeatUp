import styled from "styled-components";

import Navbar from "../components/Navbar";
import Content from "../components/Content";
import Wave from "../components/svg/Wave";

const styledBeatUp = styled(BeatUp)``;

function BeatUp(props) {
  return (
    <>
      <Navbar />
      <Wave height={500} width={1000} n={5} />
    </>
  );
}

export default styledBeatUp;
