import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 2rem;
  font-size: 1rem;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
`;

const Copyright = () => {
  return (
    <Container>Copyright © 2023 Harverst Hub. Всички права запазени.</Container>
  );
};

export default Copyright;
