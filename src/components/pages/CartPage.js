import styled from "styled-components";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../common/CartContext";
import CartItem from "../common/CartItem";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div``;

const NavbarPadding = styled.div`
  height: 4.5rem;
`;
const Announcment = styled.div`
  height: 40px;
  background-color: gray;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  background-color: aliceblue;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const BottomButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
`;

const ClearCartButton = styled.button`
  width: 25%;
  padding: 10px;
  background-color: #800020;
  color: white;
  font-weight: 600;
  transition: 0.15s ease-in;
  &:hover {
    background-color: #d90000;
  }
`;

const ContinueShoppingButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
  transition: 0.15s ease-in;
  &:hover {
    background-color: white;
    color: teal;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 25%;
  color: white;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
  transition: 0.15s ease-in;
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

const Hr = styled.hr`
  margin-right: 20px;
`;

const EmtpyCartContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CartPage = () => {
  const cart = useContext(CartContext);
  const [deliveryDiscount, setDeliveryDiscount] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const calculateSubtotal = () => {
    const subtotal = cart.items.reduce((sum, cartItem) => {
      const item = allProducts.find((a) => a.id === cartItem.id);
      if (item) {
        return sum + item.price * cartItem.quantity;
      }
      return sum;
    }, 0);
    return subtotal;
  };

  useEffect(() => {
    async function getItemData() {
      try {
        const response = await axios.get("http://localhost:5163/api/Item");
        const allItems = response.data;
        setAllProducts(allItems);
      } catch (error) {
        console.error("Error while loading items", error);
      }
    }
    getItemData();
  }, []);

  const subtotal = calculateSubtotal();
  const totalCost = subtotal < 50 ? subtotal + 6.9 : subtotal;

  useEffect(() => {
    setDeliveryDiscount(subtotal < 50);
  }, [subtotal]);

  const generateProductString = () => {
    // Map the cart items to a string in the desired format
    let productString = cart.items
      .map((currentItem) => {
        const product = allProducts.find((a) => a.id === currentItem.id);
        if (product) {
          return `${product.title} - ${product.price.toFixed(2)} лв. - Брой: ${
            currentItem.quantity
          }`;
        }
        return "";
      })
      .filter((str) => str !== "") // Remove empty strings
      .join(" || "); // Join the formatted strings with a comma and space

    productString += ` || Доставка: ${deliveryDiscount ? "6.90" : "0.00"} лв.`;

    return productString;
  };

  const productString = generateProductString();

  return (
    <Container>
      <NavbarPadding />
      <Announcment>Безплатна доставка за поръчки над 50 лв!</Announcment>
      <Wrapper>
        <Title>КОЛИЧКА</Title>
        <Body>
          <Info>
            <Hr />
            {productsCount > 0 ? (
              <>
                {cart.items.map((currentItem, idx) => (
                  <CartItem
                    key={idx}
                    id={currentItem.id}
                    quantity={currentItem.quantity}
                  />
                ))}
                <BottomButtonsContainer>
                  <ClearCartButton onClick={cart.clearCart}>
                    ИЗПРАЗНИ КОЛИЧКАТА
                  </ClearCartButton>
                  <StyledLink to="/market" state={{ city: "София" }}>
                    <ContinueShoppingButton>
                      ПРОДЪЛЖИ ПАЗАРУВАНЕТО
                    </ContinueShoppingButton>
                  </StyledLink>
                </BottomButtonsContainer>
              </>
            ) : (
              <EmtpyCartContainer>
                <h1>Количката Ви е празна!</h1>
                <StyledLink
                  to="/market"
                  style={{
                    width: "25%",
                    alignSelf: "flex-end",
                    marginRight: "20px",
                  }}
                  state={{ city: "София" }}
                >
                  <ContinueShoppingButton>
                    ПРОДЪЛЖИ ПАЗАРУВАНЕТО
                  </ContinueShoppingButton>
                </StyledLink>
              </EmtpyCartContainer>
            )}
          </Info>
          <Summary>
            <SummaryTitle>ИНФОРМАЦИЯ ЗА ПОРЪЧКАТА</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Междинна сума</SummaryItemText>
              <SummaryItemPrice>
                {calculateSubtotal().toFixed(2)} лв.
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Цена за доставка</SummaryItemText>
              <SummaryItemPrice>6.90 лв.</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Отстъпка на доставката</SummaryItemText>
              <SummaryItemPrice>
                {!deliveryDiscount ? "-6.90 лв." : "-0.00 лв."}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Общо</SummaryItemText>
              <SummaryItemPrice>{totalCost.toFixed(2)} лв.</SummaryItemPrice>
            </SummaryItem>
            <StyledLink
              state={{
                allowed: "yes",
                price: totalCost,
                products: productString,
              }}
              to="/checkout"
            >
              <Button disabled={productsCount === 0}>ПРОДЪЛЖИ</Button>
            </StyledLink>
          </Summary>
        </Body>
      </Wrapper>
      <Footer />
      <Copyright />
    </Container>
  );
};

export default CartPage;
