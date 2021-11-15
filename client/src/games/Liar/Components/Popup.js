import React from "react";
import styled from "styled-components";

const Popup = (props) => {
  return (
    <div className={props.className}>
      {Array(9)
        .fill(1)
        .map((ele, id) => (
          <Button
            className="popup-btn"
            key={id + 2}
            color="primary"
            onClick={() => props.setvalue(id + 2)}
          >
            {id + 2}
          </Button>
        ))}
      <Button
        className="popup-btn"
        key={11}
        color="primary"
        onClick={() => props.setvalue(11)}
      >
        Jack
      </Button>
      <Button
        className="popup-btn"
        key={12}
        color="primary"
        onClick={() => props.setvalue(12)}
      >
        Queen
      </Button>
      <Button
        className="popup-btn"
        key={13}
        color="primary"
        onClick={() => props.setvalue(13)}
      >
        King
      </Button>
    </div>
  );
};
const StyledPopup = styled(Popup)`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: ${(props) => props.theme.secDark};
  font-size: 0.5em;
  padding: 0 1em;
  .popup-btn {
    width: 2.5em;
    text-align: center;
  }
`;

export default StyledPopup;
