import { useState } from "react";
import FormInput from "../common/FormInput";
import styled from "styled-components";
import Home from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("assets/Images/backgroundRegister1.jpg");
  background-size: cover;
  background-position: center;
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
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 75%;
  padding: 20px 30px;
  background-color: #fcfcfc;
  border: 5px solid;
  border-color: lightgray;
  border-radius: 25px;
  margin-bottom: 4.5rem;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.55);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
  height: 100%;
  width: 100%;
`;

const FormTitleDiv = styled.div`
  background-color: blue;
  flex: 1;
`;
const FormInputsContainer = styled.div`
  background-color: red;
  flex: 10;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
const FormInputDiv = styled.div`
  background-color: yellow;
`;
const FormButtonContainer = styled.div`
  background-color: gray;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: yellowgreen;
`;

function RegisterOld() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-20 characters and shouldn't contain any special characters!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "This is not a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-25 characters and include at least one number, special character, lower and upper case letter!",
      label: "Password",
      pattern:
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "ConfirmPassword",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
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
          <Form onSubmit={handleSumbit}>
            <FormTitleDiv>
              <Title>Register</Title>
            </FormTitleDiv>
            <FormInputsContainer>
              {inputs.map((input) => (
                <FormInputDiv>
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                </FormInputDiv>
              ))}
              <FormButtonContainer>
                <Button>Register</Button>
              </FormButtonContainer>
            </FormInputsContainer>
          </Form>
        </Wrapper>
      </FormDiv>
    </Container>
  );
}

export default RegisterOld;
