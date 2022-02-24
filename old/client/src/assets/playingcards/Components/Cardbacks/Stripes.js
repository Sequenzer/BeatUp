import * as React from "react";

function SvgStripes(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={348}
      height="355pt"
      viewBox="0 0 261 355"
      {...props}
    >
      <defs>
        <clipPath id="stripes_svg__a">
          <path d="M10.664.586h239.672c5.543 0 10.035 4.195 10.035 9.371v335.086c0 5.176-4.492 9.371-10.035 9.371H10.664c-5.543 0-10.035-4.195-10.035-9.371V9.957C.629 4.781 5.12.586 10.664.586zm0 0" />
        </clipPath>
        <clipPath id="stripes_svg__b">
          <path d="M0 0h261v345H0zm0 0" />
        </clipPath>
        <clipPath id="stripes_svg__c">
          <path d="M10.664.586h239.672c5.543 0 10.035 4.195 10.035 9.371v335.086c0 5.176-4.492 9.371-10.035 9.371H10.664c-5.543 0-10.035-4.195-10.035-9.371V9.957C.629 4.781 5.12.586 10.664.586zm0 0" />
        </clipPath>
        <clipPath id="stripes_svg__d">
          <path d="M10.664.586h239.672c5.543 0 10.035 4.195 10.035 9.371v335.086c0 5.176-4.492 9.371-10.035 9.371H10.664c-5.543 0-10.035-4.195-10.035-9.371V9.957C.629 4.781 5.12.586 10.664.586zm0 0" />
        </clipPath>
      </defs>
      <g clipPath="url(#stripes_svg__a)">
        <path fill="#fff" d="M0 0h261v355H0z" />
      </g>
      <g clipPath="url(#stripes_svg__b)">
        <g clipPath="url(#stripes_svg__c)">
          <path d="M0 344.457l383.973-355" />
        </g>
      </g>
      <g clipPath="url(#stripes_svg__d)">
        <path
          d="M0 294.001l306.001-303"
          transform="scale(1.2548 1.17162)"
          fill="none"
          strokeWidth={430}
          stroke="#00f"
          strokeDasharray="3.67,3.67"
        />
      </g>
      <path
        d="M8.499.5H199.5A7.997 7.997 0 01207.5 8.5V294.5a7.997 7.997 0 01-7.998 7.999H8.5A7.997 7.997 0 01.5 294.5V8.5A7.997 7.997 0 018.5.5zm0 0"
        transform="scale(1.2548 1.17162)"
        fill="none"
        strokeWidth={0.5}
        stroke="#000"
      />
    </svg>
  );
}

export default SvgStripes;
