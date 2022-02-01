import React, { useState } from "react";
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
    background-color: ${(props) => props.theme.darkAccent};
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
    background-color: ${(props) => props.theme.darkShade};
    border-radius: ${(props) => props.radius}px 0 0 ${(props) => props.radius}px;
    transition: 0.4s;
    filter: ${(props) => props.theme.shadowFilter};
  }
  input:checked + .slider {
    background-color: ${(props) => props.theme.lightAccent};
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
    background-color: ${(props) => props.theme.lightShade};
    font-size: ${(props) => props.height * 0.7}px;
    font-family: ${(props) => props.theme.textfont};
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
}))`
  width: ${(props) => props.width}px;

  .slider {
    width: 100%;
    height: ${(props) => props.height}px;
    background-color: ${(props) => props.theme.darkAccent};
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .slider:hover {
    opacity: 1;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: ${(props) => props.height * 0.5}px;
    height: ${(props) => props.height * 0.5}px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.darkShade};
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: ${(props) => props.height * 0.5}px;
    height: ${(props) => props.height * 0.5}px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.darkShade};
    cursor: pointer;
  }
`;

function GlobalSettings(props) {
  const [slider, setSlider] = useState(50);

  const handleSlider = (e) => {
    setSlider(e.target.value);
  };

  return (
    <div className={props.className}>
      <form onSubmit={props.handleNameChange}>
        <StyledSwitch width={100} />
        <StyledStringInput width={200} placeholder={props.username} />
        <StyledSlider
          width={200}
          value={slider}
          onInput={(evt) => handleSlider(evt)}
        />
      </form>
    </div>
  );
}

const styledGlobalSettings = styled(GlobalSettings)`
  height: 50vh;
  width: 30vw;

  position: absolute;
  border-radius: 2em;
  background-color: ${(props) => props.theme.lightShade};
  opacity: 80%;
`;

export default styledGlobalSettings;
