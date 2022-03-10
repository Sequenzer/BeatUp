import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { withIronSessionSsr } from "iron-session/next";

import useUser from "hooks/useUser";

import Gear from "components/svg/Gear";
import Settings from "components/Settings";
import { BeatUpLogo } from "components/svg/Logo";

function Navbar(props) {
  const [logo, punchLogo] = useState(false);
  const [settings, setSettings] = useState(false);

  // Check if user is logged in
  const { user } = useUser();

  return (
    <nav className={props.className}>
      <Link href="/" passHref>
        <a
          className="logo"
          onMouseEnter={() => punchLogo(true)}
          onMouseLeave={() => punchLogo(false)}
        >
          <BeatUpLogo light={!logo} />
        </a>
      </Link>
      <div className="settings">
        <Gear
          className="settings_btn"
          onClick={() => setSettings(!settings)}
          activeSettings={settings}
          username={user ? user.username : "Waiting for username..."}
        />
        {settings && <Settings />}
      </div>
    </nav>
  );
}

export default styled(Navbar)`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  .logo {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.darkShade};
    height: 3rem;
    width: 2.3rem;
    border-radius: 0.6rem 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: ${(props) => props.theme.shadows.sharp};
    :hover {
      background-color: ${(props) => props.theme.colors.lightShade};
    }
    :active {
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15),
        inset 0px 2px 2px rgba(0, 0, 0, 0.2),
        inset 0px 1px 1px rgba(0, 0, 0, 0.25);
    }
    svg {
      position: absolute;
      width: 140%;
      height: auto;
    }
  }
  .settings_btn {
    width: auto;
    z-index: 1;
    height: 2.5rem;
    filter: ${(props) => props.theme.filters.sharp};
    :hover {
      cursor: pointer;
    }
  }

  .settings {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }
`;
