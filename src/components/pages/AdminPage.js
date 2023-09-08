import styled from "styled-components";
import Home from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

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
const MiddleDiv = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: end;
  margin-bottom: 25px;
`;
const FormDiv = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  flex: 8;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 20px 30px;
  background-color: #fcfcfc;
  border: 5px solid;
  border-color: lightgray;
  border-radius: 25px;
  margin: 10px 25px;
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

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  font-size: 22px;
  margin: 15px;
  padding: 10px 15px;
  border-color: darkgray;
  border-radius: 15px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
  appearance: none;
`;

const Option = styled.option``;

const Button = styled.button`
  width: 46%;
  height: 3.8rem;
  border: none;
  font-size: 28px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  cursor: pointer;
  margin: 10px 12px;
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

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 30px;
`;

const CheckboxInput = styled.input``;

const CheckboxText = styled.span`
  font-size: 22px;
  margin: 0px 10px;
`;

const AdminPage = () => {
  //USE STATES
  const [openItems, setOpenItems] = useState(false);
  const [openUsers, setOpenUsers] = useState(false);
  const [adminChecked, setAdminChecked] = useState(false);
  const [itemInputValues, setItemInputValues] = useState({
    title: "",
    description: "",
    category: "Категория",
    region: "Регион",
    price: "",
  });
  const [userInputValues, setUserInputValues] = useState({
    name: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  //ITEMS LOGIC

  const handleItemInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "title" && value.length > 30) {
      // Limit the input value to 30 characters
      return;
    }

    // Special handling for select elements
    if (event.target.tagName === "SELECT") {
      // Update the state for the selected option
      setItemInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      // For other input elements
      setItemInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleCloseItems = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenItems(false);
  };

  const handleItemSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5163/api/Item", {
        title: itemInputValues.title,
        description: itemInputValues.description,
        category: itemInputValues.category,
        imgSrc: "/assets/Images/FiltersBG.png",
        region: itemInputValues.region,
        price: itemInputValues.price,
      });
      // Handle successful response, e.g., display a success message
      console.log("Data posted successfully:", response.data);

      setOpenItems(true);

      setItemInputValues({
        title: "",
        description: "",
        category: "Категория",
        region: "Регион",
        price: "",
      });
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error("Error posting data:", error);
    }
  };

  //USER LOGIC

  const handleChangeAdminCheckBox = () => {
    setAdminChecked(!adminChecked);
  };

  const handleUserInputChange = (event) => {
    const { name, value } = event.target;
    setUserInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCloseUsers = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenUsers(false);
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5163/api/Register", {
        name: userInputValues.name,
        lastName: userInputValues.lastName,
        username: userInputValues.username,
        email: userInputValues.email,
        password: userInputValues.password,
      });
      // Handle successful response, e.g., display a success message
      console.log("Data posted successfully:", response.data);

      setOpenUsers(true);

      setUserInputValues({
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      // Handle error, e.g., display an error message
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
      <MiddleDiv>
        <Title style={{ fontWeight: "600", fontSize: "48px" }}>
          АДМИНИСТРАТОРСКИ ПАНЕЛ
        </Title>
      </MiddleDiv>
      <FormDiv>
        <Wrapper>
          <Title>СЪЗДАЙ АРТИКУЛ</Title>
          <Form onSubmit={handleItemSubmit}>
            <Input
              placeholder="Име"
              name="title"
              value={itemInputValues.title}
              onChange={handleItemInputChange}
            />
            <Input
              placeholder="Описание"
              name="description"
              value={itemInputValues.description}
              onChange={handleItemInputChange}
            />
            <Select
              name="category"
              value={itemInputValues.category}
              onChange={handleItemInputChange}
            >
              <Option disabled selected hidden>
                Категория
              </Option>
              <Option>Плодове & Зеленчуци</Option>
              <Option>Месо</Option>
              <Option>Млечни & Яйца</Option>
              <Option>Цветя и Растения</Option>
              <Option>Напитки</Option>
              <Option>На разпродажба</Option>
            </Select>
            <Select
              name="region"
              value={itemInputValues.region}
              onChange={handleItemInputChange}
            >
              <Option disabled selected hidden>
                Регион
              </Option>
              <Option>София</Option>
              <Option>Варна</Option>
              <Option>Пловдив</Option>
              <Option>Бургас</Option>
              <Option>Русе</Option>
              <Option>Стара Загора</Option>
            </Select>
            <Input
              placeholder="Цена"
              type="number"
              step=".01"
              min="0"
              max="1000"
              name="price"
              value={itemInputValues.price}
              onChange={handleItemInputChange}
            />
            <Button
              type="submit"
              disabled={
                itemInputValues.category === "Категория" ||
                itemInputValues.region === "Регион" ||
                itemInputValues.price === "" ||
                itemInputValues.title === "" ||
                itemInputValues.description === ""
              }
            >
              СЪЗДАЙ
            </Button>
            <Snackbar
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={openItems}
              onClose={handleCloseItems}
            >
              <Alert
                onClose={handleCloseItems}
                severity="success"
                variant="filled"
              >
                Артикул Създаден Успешно!
              </Alert>
            </Snackbar>
          </Form>
        </Wrapper>
        <Wrapper>
          <Title>СЪЗДАЙ АКАУНТ</Title>
          <Form onSubmit={handleUserSubmit}>
            <Input
              placeholder="Име"
              name="name"
              value={userInputValues.name}
              onChange={handleUserInputChange}
            />
            <Input
              placeholder="Фамилия"
              name="lastName"
              value={userInputValues.lastName}
              onChange={handleUserInputChange}
            />
            <Input
              placeholder="Потребителско Име"
              name="username"
              value={userInputValues.username}
              onChange={handleUserInputChange}
            />
            <Input
              type="email"
              placeholder="Имейл"
              name="email"
              value={userInputValues.email}
              onChange={handleUserInputChange}
            />
            <Input
              placeholder="Парола"
              name="password"
              value={userInputValues.password}
              onChange={handleUserInputChange}
            />
            <CheckboxContainer>
              <CheckboxInput
                type="checkbox"
                checked={adminChecked}
                onChange={handleChangeAdminCheckBox}
              />
              <CheckboxText>Администраторски Акаунт</CheckboxText>
            </CheckboxContainer>
            <Button
              type="submit"
              disabled={
                userInputValues.name === "" ||
                userInputValues.lastName === "" ||
                userInputValues.username === "" ||
                userInputValues.email === "" ||
                userInputValues.password === ""
              }
            >
              СЪЗДАЙ
            </Button>
            <Snackbar
              autoHideDuration={2000}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={openUsers}
              onClose={handleCloseUsers}
            >
              <Alert
                onClose={handleCloseUsers}
                severity="success"
                variant="filled"
              >
                Акаунт Създаден Успешно!
              </Alert>
            </Snackbar>
          </Form>
        </Wrapper>
      </FormDiv>
    </Container>
  );
};

export default AdminPage;
