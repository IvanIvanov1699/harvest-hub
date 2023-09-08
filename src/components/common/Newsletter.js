import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  transition: 0.25s ease;
  &:hover {
    background-color: white;
    color: teal;
    border: solid 1px teal;
  }
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Бюлетин</Title>
      <Desc>
        Абонирай се за нашия бюлетин за да получаваш актуални оферти и важни
        промени свързани с платформата!
      </Desc>
      <InputContainer>
        <Input placeholder="Email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
