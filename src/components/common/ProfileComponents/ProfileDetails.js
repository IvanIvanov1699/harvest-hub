import { TextField } from "@mui/material";
import { styled } from "styled-components";

const Container = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1``;

const DetailsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
`;

const TextFieldContainer = styled.div`
  margin: 10px 28px;
  width: 22vw;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  width: 22vw;
  font-size: 22px;
  padding: 12px 15px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  margin: 50px 0px;
  border-radius: 15px;
  transition: 0.1s ease-in;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
    color: gray;
    border-color: gray;
  }
  &:not([disabled]):hover {
    background-color: white;
    color: teal;
  }
`;

const Hr = styled.hr``;

const ProfileDetails = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Промяна на Информацията</Title>
      </TitleContainer>
      <Hr />
      <DetailsForm>
        <InputsContainer>
          <TextFieldContainer>
            <StyledTextField required label="Име" variant="filled" />
          </TextFieldContainer>
          <TextFieldContainer>
            <StyledTextField required label="Фамилия" variant="filled" />
          </TextFieldContainer>
          <TextFieldContainer>
            <StyledTextField
              required
              label="Потербителско Име"
              variant="filled"
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <StyledTextField
              required
              label="Имейл"
              variant="filled"
              type="email"
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <StyledTextField
              label="Потвърдете с Парола"
              variant="filled"
              type="password"
              required
            />
          </TextFieldContainer>
        </InputsContainer>
        <Button>ПРОМЕНИ</Button>
      </DetailsForm>
    </Container>
  );
};

export default ProfileDetails;
