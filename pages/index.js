import stlyed from "styled-components";

const styledHomePage = stlyed(HomePage)`
    background-color: green;
    stroke: black;
`;

function HomePage(props) {
  return <div className={props.className}>My Empty Next.js Page</div>;
}

export default styledHomePage;
