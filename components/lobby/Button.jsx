import styled from "styled-components";

const Btn = (props) => (
  <div className={props.className} onClick={props.onClick}>
    <nobr>{props.children}</nobr>
  </div>
);
export default styled(Btn)`
  color: ${(props) =>
    props.color === "darkShade"
      ? props.theme.colors.lightShade
      : props.theme.colors.darkShade};
  background-color: ${(props) => props.theme.colors[props.color]};
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 1.5em;
  line-height: 2rem;
  width: 100%;
  user-select: none;
  padding: 0.2em 0.8em;
  vertical-align: middle;
  text-align: center;
  border-radius: 1.5rem 0;
  box-shadow: ${(props) => props.theme.shadows.sharp};
  :hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.lightShade};
    cursor: pointer;
  }
  :active {
    box-shadow: ${(props) =>
      props.theme.shadows.sharp + props.theme.shadows.inset};
  }
`;
