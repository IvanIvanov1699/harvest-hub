import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import StoreIcon from "@mui/icons-material/Storefront";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountIcon from "@mui/icons-material/AccountCircleOutlined";
import AddressesIcon from "@mui/icons-material/FmdGoodOutlined";
import OrdersIcon from "@mui/icons-material/LocalShippingOutlined";

const SideNavContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;
  margin: 0;
  padding: 0;
  transition: 0.15s ease-in;

  &:hover {
    background-color: #29c1c1;
  }
`;

const SideMenuButton = styled(Link)`
  margin: 0 1rem;
  height: 100%;
  font-size: 2.7rem;
  padding: 0;
  background: none;
  color: #ffffff;
`;

const SideNavMenu = styled.nav`
  background-color: #3e363f;
  width: 21rem;
  height: 100vh;
  display: flex;
  justify-content: left;
  position: fixed;
  top: 0;
  left: ${({ active }) => (active ? "0" : "-100%")};
  transition: ${({ active }) => (active ? "450ms" : "850ms")};
`;

const UnorderedList = styled.ul`
  padding-left: 0px;
  margin-left: 10px;
`;

const ListItem = styled.li``;

const SideNavText = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.3rem 0px 0.3rem 1rem;
  list-style: none;
  height: 4rem;

  a {
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    border-radius: 4px;
    transition: 0.15s ease-in;

    &:hover {
      background-color: #6c636c;
    }
  }
`;

const SideSpan = styled.span`
  margin-left: 16px;
`;

const StyledLink = styled(Link)`
  font-size: 2.7rem;
  color: white;
  margin-left: 5px;
`;

export default function SideNav() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <SideNavContainer>
      <SideMenuButton to="#">
        <FaBars onClick={showSidebar} />
      </SideMenuButton>

      <SideNavMenu active={sidebar ? 1 : 0}>
        <UnorderedList onClick={showSidebar}>
          <ListItem style={{ listStyle: "none" }}>
            <StyledLink to="#">
              <AiOutlineClose />
            </StyledLink>
          </ListItem>
          <SideNavText>
            <Link to="/">
              <HomeIcon style={{ fontSize: "34px" }} />
              <SideSpan>Начална Страница</SideSpan>
            </Link>
          </SideNavText>
          <SideNavText>
            <Link to="/market" state={{ city: "София" }}>
              <StoreIcon style={{ fontSize: "34px" }} />
              <SideSpan>Пазарувай</SideSpan>
            </Link>
          </SideNavText>
          <SideNavText>
            <Link to="/cart">
              <CartIcon style={{ fontSize: "34px" }} />
              <SideSpan>Количка</SideSpan>
            </Link>
          </SideNavText>
          <SideNavText>
            <Link to="/profile" state={{ setActive: "Profile" }}>
              <AccountIcon style={{ fontSize: "34px" }} />
              <SideSpan>Профил</SideSpan>
            </Link>
          </SideNavText>
          <SideNavText>
            <Link to="/profile" state={{ setActive: "Addresses" }}>
              <AddressesIcon style={{ fontSize: "34px" }} />
              <SideSpan>Адреси</SideSpan>
            </Link>
          </SideNavText>
          <SideNavText>
            <Link to="/profile" state={{ setActive: "Orders" }}>
              <OrdersIcon style={{ fontSize: "34px" }} />
              <SideSpan>Поръчки</SideSpan>
            </Link>
          </SideNavText>
        </UnorderedList>
      </SideNavMenu>
    </SideNavContainer>
  );
}
