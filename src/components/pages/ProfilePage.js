import { styled } from "styled-components";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import { useEffect, useState } from "react";
import ProfileMenuPicker from "../common/ProfileComponents/ProfileMenuPicker";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const NavbarPadding = styled.div`
  height: 4.5rem;
`;

const TitleContainer = styled.div`
  background-color: aliceblue;
  padding: 20px;
`;

const Wrapper = styled.div`
  background-color: aliceblue;
  padding: 0px 20px;
  height: 64vh;
  display: flex;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 600;
`;

const Hr = styled.hr``;

const ProfileMenu = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
  background-color: #effdea;
`;

const MenuButton = styled.button`
  width: 100%;
  padding: 10px;
  //border: none;
  background-color: white;
  border-radius: 10px;

  font-weight: 600;
  font-size: 24px;
  transition: 0.15s ease-in-out;
`;

const ProfileComponentContainer = styled.div`
  flex: 5;
  height: 60vh;
  padding: 20px;
  margin-left: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: #effdea;
`;

const ProfilePage = () => {
  const [activeView, setActiveView] = useState("Profile");
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      setActiveView(location.state.setActive);
    }
  }, [location.state]);

  const handleMenuButtonClick = (view) => {
    setActiveView(view);
  };

  return (
    <Container>
      <NavbarPadding />
      <TitleContainer>
        <Title>ПРОФИЛ</Title>
        <Hr />
      </TitleContainer>
      <Wrapper>
        <ProfileMenu>
          <MenuButton
            onClick={() => handleMenuButtonClick("Profile")}
            style={{
              backgroundColor: activeView === "Profile" ? "teal" : "white",
              color: activeView === "Profile" ? "white" : "black",
            }}
          >
            Профил
          </MenuButton>
          <MenuButton
            onClick={() => handleMenuButtonClick("ChangePassword")}
            style={{
              backgroundColor:
                activeView === "ChangePassword" ? "teal" : "white",
              color: activeView === "ChangePassword" ? "white" : "black",
            }}
          >
            Промяна на паролата
          </MenuButton>
          <MenuButton
            onClick={() => handleMenuButtonClick("Addresses")}
            style={{
              backgroundColor: activeView === "Addresses" ? "teal" : "white",
              color: activeView === "Addresses" ? "white" : "black",
            }}
          >
            Адреси
          </MenuButton>
          <MenuButton
            onClick={() => handleMenuButtonClick("Orders")}
            style={{
              backgroundColor: activeView === "Orders" ? "teal" : "white",
              color: activeView === "Orders" ? "white" : "black",
            }}
          >
            Поръчки
          </MenuButton>
          <MenuButton
            onClick={() => handleMenuButtonClick("DeleteAccount")}
            style={{
              backgroundColor:
                activeView === "DeleteAccount" ? "teal" : "white",
              color: activeView === "DeleteAccount" ? "white" : "black",
            }}
          >
            Изтриване на Акаунт
          </MenuButton>
        </ProfileMenu>
        <ProfileComponentContainer>
          <ProfileMenuPicker view={activeView} />
        </ProfileComponentContainer>
      </Wrapper>
      <Footer />
      <Copyright />
    </Container>
  );
};

export default ProfilePage;
