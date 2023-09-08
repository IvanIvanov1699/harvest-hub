import { Link } from "react-router-dom";
import SideNav from "../SideNav/SideNav";
import styled from "styled-components";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Badge } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext";

const NavBarLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 28px;
  padding: 0 20px;
`;

const LogoTitle = styled.h1`
  font-size: 3.3rem;
  white-space: nowrap;
  padding: 0;
  margin: 0;
`;

const LogoContainer = styled.div`
  background-color: none;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NavBarBody = styled.nav`
  background: teal;
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 4.5em;
  justify-content: space-between;
  align-items: stretch;
  gap: 2rem;
  display: flex;
  flex-direction: row;
  padding-right: 1rem;
`;

const ListItem = styled.li`
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100%;
  transition: 0.15s ease-in;
  &:hover {
    background-color: #29c1c1;
  }
`;

const UnorderedList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: 1rem;
`;

export default function NavBar({ isLoggedIn, onLogout }) {
  const cart = useContext(CartContext);
  const [productsCount, setProductsCount] = useState(0);
  useEffect(() => {
    const newProductsCount = cart.items.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    setProductsCount(newProductsCount);
    if (isNaN(productsCount)) {
      setProductsCount(0);
    }
  }, [cart.items]);

  const handleLogout = () => {
    cart.clearCart();
    onLogout();
  };

  return (
    <NavBarBody>
      <LogoContainer>
        <SideNav />
        <NavBarLink to="/">
          <LogoTitle>HARVEST ❦ HUB</LogoTitle>
        </NavBarLink>
      </LogoContainer>
      <UnorderedList>
        {isLoggedIn ? (
          <>
            <ListItem>
              <NavBarLink to="/cart">
                <Badge badgeContent={productsCount} max={99} color="error">
                  <CartIcon style={{ fontSize: "40px" }} />
                </Badge>
              </NavBarLink>
            </ListItem>
            <ListItem>
              <NavBarLink to="/profile">
                <AccountCircleIcon style={{ fontSize: "40px" }} />
              </NavBarLink>
            </ListItem>

            <ListItem>
              <NavBarLink to="/" onClick={handleLogout}>
                Изход
              </NavBarLink>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <NavBarLink to="/login">Вход</NavBarLink>
            </ListItem>
            <ListItem>
              <NavBarLink to="/register">Регистрация</NavBarLink>
            </ListItem>
          </>
        )}
      </UnorderedList>
    </NavBarBody>
  );
}
