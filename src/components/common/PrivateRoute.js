import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { styled } from "styled-components";

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
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoadingText = styled.h1`
  font-size: max;
  font-weight: 600;
`;

const PrivateRoute = ({ children, adminOnly }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    const isAuthorized = () => {
      return !!token;
    };

    const authorized = isAuthorized();
    setAuthenticated(authorized);
    setIsLoaded(true);
  }, [token, setAuthenticated]);

  const AccessAllowed = () => {
    if (adminOnly) {
      if (token) {
        const tokenData = jwtDecode(token.result);
        const userRole =
          tokenData[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        return authenticated && userRole === "Admin";
      } else {
        return false;
      }
    }

    return authenticated;
  };

  return (
    <>
      {isLoaded ? (
        AccessAllowed() ? (
          children
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Container>
          <LoadingText>Зареждане...</LoadingText>
        </Container>
      )}
    </>
  );
};

export default PrivateRoute;
