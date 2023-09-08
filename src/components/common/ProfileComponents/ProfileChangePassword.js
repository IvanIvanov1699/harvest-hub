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
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: end;
`;

const Button = styled.button`
  width: 22vw;
  font-size: 22px;
  padding: 12px 15px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  margin: 30px 0px;
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

const TextFieldContainer = styled.div`
  margin: 10px 5px;
  width: 22vw;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  height: 100%;
`;

const Hr = styled.hr``;

const ProfileChangePassword = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Промяна на Паролата</Title>
      </TitleContainer>
      <Hr />
      <DetailsForm>
        <TextFieldContainer>
          <StyledTextField label="Стара Парола" variant="filled" required />
        </TextFieldContainer>
        <TextFieldContainer>
          <StyledTextField label="Нова Парола" variant="filled" required />
        </TextFieldContainer>
        <TextFieldContainer>
          <StyledTextField
            label="Потвърди Паролата"
            variant="filled"
            required
          />
        </TextFieldContainer>
        <Button>ПРОМЕНИ</Button>
      </DetailsForm>
    </Container>
  );
};

export default ProfileChangePassword;
