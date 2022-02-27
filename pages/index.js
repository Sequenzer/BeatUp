import styled from "styled-components";
import { useState } from "react";

import { BeatUpLogo as Logo } from "../components/svg/Logo";

import { styledBtn as Btn } from "../components/Buttons";

function BeatUp(props) {
  // const Code = generateCombination(2, "-");
  const [mainLogo, setMainLogo] = useState(false);

  return (
    <div className={props.className}>
      <div
        className="logo"
        onMouseEnter={() => setMainLogo(true)}
        onMouseLeave={() => setMainLogo(false)}
      >
        <Logo light={false} punched={mainLogo} />
      </div>
      <section className="content">
        <h1>Welcome to the game!</h1>
        <div className="btn-list">
          <Btn href="/">Create Lobby</Btn>
          <Btn href="/">Browse Games</Btn>
        </div>
      </section>
    </div>
  );
}

const styledBeatUp = styled(BeatUp).attrs((props) => ({
  test: 1,
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    filter: ${(props) => props.theme.filters.sharp};
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 {
      font-size: 2.5rem;
      font-family: ${(props) => props.theme.fonts.alttitle};
    }
  }

  .btn-list {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 2vh;
  }
`;

export default styledBeatUp;
