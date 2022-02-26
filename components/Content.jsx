import styled from "styled-components";

const ContentPage = function (props) {
  return (
    <div className={props.className}>
      <h1>Header 1</h1>
      <p>This is Content 2</p>
    </div>
  );
};

export default styled(ContentPage)`
  background-color: #cc3131;
`;
