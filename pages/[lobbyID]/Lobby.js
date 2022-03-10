import styled from "styled-components";
import { useRouter } from "next/router";
import Navbar from "components/Navbar";

const Lobby = ({}) => {
  const router = useRouter();
  const { lobbyID } = router.query;
  return (
    <>
      <Navbar />
      <h1>Lobby</h1>
      <p>This is the lobby page</p>
    </>
  );
};

const styledLobby = styled(Lobby)``;

export default styledLobby;
