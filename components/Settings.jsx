import { useState } from "react";
import styled from "styled-components";

function Switch(props) {
  return (
    <div className={props.className}>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
    </div>
  );
}

const StyledSwitch = styled(Switch).attrs((props) => ({
  height: props.height || (props.width * 0.4) | 20,
  width: props.width || (props.height * 2.5) | 50,
  radius: props.radius || (props.width * 0.1) | 5,
}))`
  .switch {
    position: relative;
    display: inline-block;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    background-color: ${(props) => props.theme.colors.darkAccent};
    box-shadow: ${(props) =>
      `inset 0px ${(props.radius * 1) / 5}px ${
        (props.radius * 1) / 5
      }px rgba(0, 0, 0, 0.25)`};
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0.4s;
    border-radius: ${(props) => props.radius}px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: ${(props) => props.height}px;
    width: ${(props) => props.width * 0.5}px;
    background-color: ${(props) => props.theme.colors.darkShade};
    border-radius: ${(props) => props.radius}px 0 0 ${(props) => props.radius}px;
    transition: 0.4s;
    filter: ${(props) => props.theme.filters.sharp};
  }
  input:checked + .slider {
    background-color: ${(props) => props.theme.colors.lightAccent};
  }
  input:checked + .slider:before {
    transform: translateX(${(props) => props.width * 0.5}px);
    border-radius: 0 ${(props) => props.radius}px ${(props) => props.radius}px 0;
  }
`;

function StringInput(props) {
  return (
    <div className={props.className}>
      <input
        type="text"
        placeholder={props.placeholder + "..."}
        className="input"
      />
    </div>
  );
}

const StyledStringInput = styled(StringInput).attrs((props) => ({
  height: props.height || ((props.width * 1) / 10) | 20,
  width: props.width || (props.height * 10) | 200,
  radius:
    props.radius || ((props.height * 1) / 4) | ((props.width * 1) / 40) | 5,
}))`
  .input {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: ${(props) => props.radius}px;
    border: none;
    box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25),
      inset 2px 2px 2px rgba(0, 0, 0, 0.2);
    background-color: ${(props) => props.theme.colors.lightShade};
    font-size: ${(props) => props.height * 0.7}px;
    font-family: ${(props) => props.theme.fonts.text};
    font-style: normal;
    font-weight: bold;
    line-height: 16px;
    text-align: right;
  }
`;

function Slider(props) {
  return (
    <div className={props.className} onInput={props.onInput}>
      <input
        type="range"
        min="1"
        max="100"
        defaultValue={props.value}
        className="slider"
      />
    </div>
  );
}

const StyledSlider = styled(Slider).attrs((props) => ({
  height: props.height || ((props.width * 1) / 10) | 20,
  width: props.width || (props.height * 10) | 200,
  color: props.color || props.theme.colors.lightAccent,
}))`
  width: ${(props) => props.width}px;

  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: ${(props) => (props.height * 1) / 10}px;
    background-color: ${(props) => props.theme.colors.darkShade};
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
    :hover {
      opacity: 1;
    }
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${(props) => props.height}px;
    height: ${(props) => props.height}px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    cursor: pointer;
    :hover {
      filter: ${(props) => props.theme.colors.shadowFilter};
    }
  }
  .slider::-moz-range-thumb {
    width: ${(props) => props.height * 0.5}px;
    height: ${(props) => props.height * 0.5}px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.darkShade};
    cursor: pointer;
  }
`;

function OptionChoice(props) {
  switch (props.type) {
    case "switch":
      return <StyledSwitch {...props} />;
    case "string":
      return <StyledStringInput {...props} />;
    case "slider":
      return <StyledSlider {...props} />;
    default:
      return <div>{props.type}</div>;
  }
}

function Option(props) {
  return (
    <div className={props.className}>
      <div className="option_name">{props.name}</div>
      <OptionChoice type={props.type} placeholder={props.placeholder} />
    </div>
  );
}

const StyledOption = styled(Option)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1em;
  .option_name {
    font-family: ${(props) => props.theme.fonts.text};
    font-style: normal;
    font-weight: bold;
  }
`;

function GlobalSettings(props) {
  const [slider, setSlider] = useState(50);

  const handleSlider = (e) => {
    setSlider(e.target.value);
  };

  return (
    <div className={props.className}>
      <form onSubmit={props.handleNameChange} className="option_form">
        <StyledOption
          type="string"
          name="Username:"
          placeholder={props.username}
        />
        <StyledOption type="switch" name="Memes:" />
        <StyledOption type="switch" name="Option2:" />
        <hr />
        <StyledOption type="slider" name="Volume:" />
      </form>
    </div>
  );
}

const styledGlobalSettings = styled(GlobalSettings)`
  height: 50vh;
  width: 30vw;
  position: absolute;
  border-radius: 1em;
  background-color: ${(props) => props.theme.colors.lightShade + "88"};

  hr {
    border: 0;
    height: 0;
    border-top: ${(props) => props.theme.colors.darkShade} 1px solid;
    opacity: 0.5;
    width: 100%;
    margin-bottom: 1em;
  }

  .option_form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.5em;
    padding-top: 4em;
    font-family: ${(props) => props.theme.fonts.text};
  }
`;

export default styledGlobalSettings;
