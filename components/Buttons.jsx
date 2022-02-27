import styled from "styled-components";
import Link from "next/link";

function Btn(props) {
  return (
    <Link href={props.href} passHref>
      <a className={props.className}>{props.children}</a>
    </Link>
  );
}

export const styledBtn = styled(Btn)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.lightShade};
  font-family: ${(props) => props.theme.fonts.title};
  background-color: ${(props) => props.theme.colors.darkShade};
  flex: 0 0 auto;
  margin-right: 1.5vw;
  height: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.sharp};
  display: flex;
  align-items: center;
  padding: 0 0.8em;
  border-radius: 0.7rem 0;
  :hover {
    background-color: ${(props) => props.theme.colors.primary};
    cursor: pointer;
  }
  :active {
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.15),
      inset 0px 2px 2px rgba(0, 0, 0, 0.2),
      inset 0px 1px 1px rgba(0, 0, 0, 0.25);
  }
`;
