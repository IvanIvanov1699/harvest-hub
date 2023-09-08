import styled from "styled-components";
import { Locations as LocationsList } from "../data";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  height: 81vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
`;

const TitleContainer = styled.div`
  height: 11vh;
  display: flex;
  justify-content: center;
  padding: 1vh 0;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const LocationsContainer = styled.div`
  min-height: 70vh;
  min-width: 60vw;
  display: flex;
  align-items: center;
  justify-content: cen ter;
  flex-wrap: wrap;
  padding: 0px 300px;
`;

const LocationWrapper = styled.div`
  background-color: #dff3ff;
  height: 28vh;
  width: 28vh;
  margin: 3vh 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  cursor: pointer;
  box-shadow: 6px 6px 5px rgba(0, 0, 0, 0.55);

  transition: 0.25s ease;
  &:hover {
    transform: scale(1.1);
    background-color: #c1d6e4;
  }
`;

const LocationImage = styled.img`
  height: 65%;
  width: 65%;
`;

const LocationTitle = styled.span`
  padding: 1vh 0 0 0;
  font-size: 30px;
  font-weight: 500;
`;

const LocationLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Locations = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Нашите Пазари</Title>
      </TitleContainer>
      <LocationsContainer>
        {LocationsList.map((location) => (
          <LocationLink to="/market" state={{ city: location.city }}>
            <LocationWrapper key={location.id}>
              <LocationImage src={location.img} />
              <LocationTitle>{location.title}</LocationTitle>
            </LocationWrapper>
          </LocationLink>
        ))}
      </LocationsContainer>
    </Container>
  );
};

export default Locations;
