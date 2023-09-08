import { styled } from "styled-components";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import {
  Alert,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from "@mui/material";
import { CartContext } from "../common/CartContext";

const Container = styled.div``;

const NavbarPadding = styled.div`
  height: 4.5rem;
`;
const Wrapper = styled.div`
  background-color: aliceblue;
  padding: 20px;
  min-height: 64vh;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
  height: 90%;
`;

const Select = styled.select`
  min-width: 40%;
  width: 50%;
  font-size: 22px;
  margin: 15px;
  padding: 10px 15px;
  border-color: darkgray;
  border-radius: 15px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
  appearance: none;
`;

const Button = styled.button`
  width: 22vw;
  font-size: 22px;
  padding: 12px 15px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  margin: 15px;
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

const Option = styled.option``;

const CartProducts = styled.span`
  white-space: pre-line;
  font-size: 22px;
  margin-left: 15px;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
`;
const Hr = styled.hr``;

const CheckoutPage = () => {
  const stateData = useLocation().state;
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  const [addressList, setAddressList] = useState([]);
  const [selectedAddressValue, setSelectedAddressValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Карта");

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const tokenData = jwtDecode(token.result);
  const username =
    tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5163/api/Address/${username}`)
        .then((response) => {
          // Map over the data and remove the "user" property
          const modifiedData = response.data.map((address) => {
            const { user, ...rest } = address;
            return rest;
          });
          setAddressList(modifiedData);
        })
        .catch((error) => {
          console.error("Error fetching item data:", error);
        });
    }
  }, [username]);
  console.log(selectedAddressValue);

  console.log(stateData.price);
  const handlePurchase = async () => {
    try {
      // Find the selected address in the addressList
      const selectedAddress = addressList.find(
        (address) => address.streetAddress === selectedAddressValue
      );

      if (!selectedAddress) {
        // Handle the case when the selected address is not found
        console.error("Selected address not found.");
        console.log(selectedAddress);
        setOpenAlert(true);
        return;
      }

      const response = await axios.post("http://localhost:5163/api/Purchase", {
        orderFull: stateData.products,
        addressFull: `${selectedAddress.streetAddress}, ${selectedAddress.postalCode}, ${selectedAddress.city}, ${selectedAddress.province}`,
        recipientFullName: `${selectedAddress.name} ${selectedAddress.lastName}`,
        recipientPhoneNumber: selectedAddress.phoneNumber,
        recipientEmail: selectedAddress.email,
        addressExtraInfo: selectedAddress.extraInfo,
        paymentMethod: paymentMethod,
        userName: username,
        price: stateData.price,
        status: "В процес на обработка",
      });
      console.log("Purchase successful:", response.data);
      cart.clearCart();
      navigate("/");
    } catch (error) {
      setOpenAlert(true);
      console.error("Error posting data:", error);
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddressValue(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const [openAlert, setOpenAlert] = useState(false);
  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  if (stateData === null) {
    return <Navigate to="/" />;
  }
  if (!stateData.allowed === "yes") {
    return <Navigate to="/" />;
  }
  return (
    <Container>
      <NavbarPadding />
      <Wrapper>
        <Title>ФИНАЛИЗИРАНЕ НА ПОРЪЧКАТА</Title>
        <Hr />
        <Body>
          <Select
            style={{ minWidth: "800px", height: "60px" }}
            value={selectedAddressValue}
            onChange={handleAddressChange}
          >
            <Option disabled selected hidden value="">
              Изберете Адрес
            </Option>
            {addressList.map((address, index) => (
              <Option key={index} value={address.index}>
                {address.streetAddress}
              </Option>
            ))}
          </Select>
          <CartProducts style={{ fontSize: "28px", fontWeight: "500" }}>
            Продукти:{" "}
          </CartProducts>
          <CartProducts>
            {stateData.products.replace(/\s\|\|\s/g, "\n")}
          </CartProducts>
          <Title style={{ marginLeft: "15px" }}>
            Цена на поръчката: {stateData.price.toFixed(2)} лв.
          </Title>
          <RadioGroup
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            style={{ marginLeft: "15px" }}
          >
            <FormControlLabel
              value="Карта"
              control={<Radio />}
              label={
                <Typography style={{ fontSize: "28px", fontWeight: "500" }}>
                  С карта
                </Typography>
              }
            />
            <FormControlLabel
              value="Наложен Платеж"
              control={<Radio />}
              label={
                <Typography style={{ fontSize: "28px", fontWeight: "500" }}>
                  Наложен платеж
                </Typography>
              }
            />
          </RadioGroup>
          <Button onClick={handlePurchase}>ФИНАЛИЗИРАНЕ</Button>
        </Body>
        <Snackbar
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="error" variant="filled">
            Грешка!
          </Alert>
        </Snackbar>
      </Wrapper>
      <Footer />
      <Copyright />
    </Container>
  );
};

export default CheckoutPage;
