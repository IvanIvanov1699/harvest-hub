import styled from "styled-components";
import Home from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, Modal, Snackbar } from "@mui/material";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.65),
      rgba(255, 255, 255, 0.45)
    ),
    url("assets/Images/backgroundRegister2.png") center;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;

const HomeDiv = styled.div`
  flex: 1;
`;

const HomeLink = styled(Link)`
  margin: 5px 0px;
  font-size: 18px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in;
`;

const HomeButton = styled.button`
  border: none;
  padding: 10px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  cursor: pointer;
  margin: 10px;
  border-radius: 50%;
  transition: 0.2s ease-in;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
  &:hover {
    background-color: white;
    color: teal;
  }
  &:hover ${HomeLink} {
    color: teal;
  }
`;

const FormDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 10;
`;

const Wrapper = styled.div`
  width: 45%;
  padding: 20px 30px;
  background-color: #fcfcfc;
  border: 5px solid;
  border-color: lightgray;
  border-radius: 25px;
  margin-bottom: 4.5rem;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.55);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 300;
  margin-left: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  font-size: 22px;
  margin: 15px;
  padding: 10px 15px;
  border-color: darkgray;
  border-radius: 15px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 20px;
`;

const CheckboxInput = styled.input``;

const CheckboxText = styled.span`
  font-size: 18px;
  margin: 0px 10px;
`;

const Button = styled.button`
  width: 46%;
  border: none;
  font-size: 28px;
  padding: 10px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  cursor: pointer;
  margin: 10px 15px;
  border-radius: 35px;
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

const TermsLink = styled(Link)``;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  background-color: white;
  border: 5px solid lightgray;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  padding: 15px;
`;
const ModalTitle = styled.h1``;
const ModalText = styled.span`
  font-size: 18px;
  margin: 15px;
  text-align: justify;
`;

const RegisterPage = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [checked, setChecked] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (inputValues.password === inputValues.confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [inputValues.password, inputValues.confirmPassword]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { confirmPassword, ...dataToSend } = inputValues;

    try {
      const response = await axios.post("http://localhost:5163/api/Register", {
        name: dataToSend.firstName,
        lastName: dataToSend.lastName,
        username: dataToSend.username,
        email: dataToSend.email,
        password: dataToSend.password,
      });
      // Handle successful response, e.g., display a success message
      console.log("Data posted successfully:", response.data);
      setInputValues({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/");
    } catch (error) {
      setOpenAlert(true);
      console.error("Error posting data:", error);
    }
  };

  return (
    <Container>
      <HomeDiv>
        <HomeLink to="/">
          <HomeButton>
            <Home fontSize="large" />
          </HomeButton>
        </HomeLink>
      </HomeDiv>
      <FormDiv>
        <Wrapper>
          <Title>РЕГИСТРАЦИЯ</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Име"
              name="firstName"
              value={inputValues.firstName}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Фамилия"
              name="lastName"
              value={inputValues.lastName}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Потребителско име"
              name="username"
              value={inputValues.username}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Имейл"
              name="email"
              value={inputValues.email}
              onChange={handleInputChange}
              type="email"
            />
            <Input
              placeholder="Парола"
              name="password"
              value={inputValues.password}
              onChange={handleInputChange}
              type="password"
            />
            <Input
              placeholder="Потвърдете паролата"
              name="confirmPassword"
              value={inputValues.confirmPassword}
              onChange={handleInputChange}
              type="password"
            />
            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              <CheckboxText>
                Прочетох и съм съгласен с{" "}
                <TermsLink onClick={handleOpen}>Общите условия</TermsLink>
              </CheckboxText>
            </CheckboxContainer>
            <CheckboxContainer>
              <CheckboxInput type="checkbox" />
              <CheckboxText>
                Бих искал да получавам новини, проучвания и специални оферти от
                Harvest Hub
              </CheckboxText>
            </CheckboxContainer>
            <Button disabled={!checked || !passwordsMatch} type="submit">
              РЕГИСТРИРАНЕ
            </Button>
            <StyledModal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ModalBody>
                <ModalTitle>Общи Условия</ModalTitle>
                <ModalText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Eget magna fermentum iaculis eu non diam phasellus vestibulum.
                  Sit amet est placerat in egestas. Netus et malesuada fames ac.
                  Semper feugiat nibh sed pulvinar proin gravida. Proin libero
                  nunc consequat interdum varius sit amet mattis. Risus nec
                  feugiat in fermentum. Feugiat in ante metus dictum. Diam
                  vulputate ut pharetra sit amet aliquam id diam. Eros donec ac
                  odio tempor. Mollis nunc sed id semper risus in. Ac auctor
                  augue mauris augue neque gravida in. Sollicitudin ac orci
                  phasellus egestas tellus. Egestas dui id ornare arcu odio ut
                  sem. Sed elementum tempus egestas sed. Commodo sed egestas
                  egestas fringilla phasellus faucibus scelerisque eleifend
                  donec.
                </ModalText>
              </ModalBody>
            </StyledModal>
            <Snackbar
              autoHideDuration={5000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={openAlert}
              onClose={handleAlertClose}
            >
              <Alert
                onClose={handleAlertClose}
                severity="error"
                variant="filled"
              >
                Паролата трябва да има поне една цифра, една главна буква и един
                специален символ!
              </Alert>
            </Snackbar>
          </Form>
        </Wrapper>
      </FormDiv>
    </Container>
  );
};

export default RegisterPage;
