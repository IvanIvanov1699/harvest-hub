import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Home from "@mui/icons-material/Home";
import ReCAPTCHA from "react-google-recaptcha";
import { useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.65),
      rgba(255, 255, 255, 0.35)
    ),
    url("assets/Images/LoginBackground.png") center;
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
  width: 35%;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  font-size: 22px;
  margin: 15px 0;
  padding: 10px 15px;
  border-color: darkgray;
  border-radius: 15px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
`;

const Button = styled.button`
  width: 40%;
  border: none;
  font-size: 28px;
  padding: 10px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
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

const Bot = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  margin: 5px 0px;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
`;

const CaptchaDiv = styled.div`
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.55);
  width: 301px;
  height: 75.6px;
  margin: 10px 0px 15px 0px;
`;

const Login = () => {
  const [open, setOpen] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: "",
    recaptchaResponse: null,
  });
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["token"]);
  const handleInputsChange = (event) => {
    const { name, value } = event.target;
    setLoginInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRecaptchaChange = (response) => {
    setLoginInputs((prevInputs) => ({
      ...prevInputs,
      recaptchaResponse: response,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5163/api/Login/Login",
        {
          username: loginInputs.username,
          password: loginInputs.password,
        }
      );

      const token = response.data.token;

      setCookie("token", token, {
        domain: "localhost",
        path: "/",
      });

      navigate("/");
    } catch (error) {
      setOpen(true);
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
          <Title>ВХОД</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Потребителско име"
              type="text"
              name="username"
              value={loginInputs.username}
              onChange={handleInputsChange}
            />
            <Input
              placeholder="Парола"
              type="password"
              name="password"
              value={loginInputs.password}
              onChange={handleInputsChange}
            />
            <CaptchaDiv>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleRecaptchaChange}
              />
            </CaptchaDiv>
            <Button type="submit" disabled={!loginInputs.recaptchaResponse}>
              ВХОД
            </Button>
            <Snackbar
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error" variant="filled">
                Грешни входни данни
              </Alert>
            </Snackbar>
            <Bot>
              <StyledLink to="/password-recovery">Забравена парола?</StyledLink>
              <StyledLink to="/register">
                Нямате профил? Регистрирай се сега!
              </StyledLink>
            </Bot>
          </Form>
        </Wrapper>
      </FormDiv>
    </Container>
  );
};

export default Login;
