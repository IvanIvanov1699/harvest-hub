import styled from "styled-components";

//icons
import Facebook from "@mui/icons-material/FacebookSharp";
import Instagram from "@mui/icons-material/Instagram";
import MailOutline from "@mui/icons-material/MailOutlined";
import Phone from "@mui/icons-material/LocalPhone";
import YouTube from "@mui/icons-material/YouTube";
import Room from "@mui/icons-material/Room";
import Twitter from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.55);
  transition: 0.25s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>HARVEST ❦ HUB</Logo>
        <Desc>
          Lorem ipsum dolor sit amet. Et officia consequatur est voluptatem
          velit sit ipsum voluptates et ratione accusantium est cumque ullam sed
          quae excepturi sit maiores aperiam.
        </Desc>
        <SocialContainer>
          <a href="https://www.facebook.com">
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a href="https://www.instagram.com">
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
          </a>
          <a href="https://twitter.com">
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
          </a>
          <a href="https://www.youtube.com">
            <SocialIcon color="E60023">
              <YouTube />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Полезни връзки</Title>
        <List>
          <ListItem>
            <StyledLink to="/">Начална страница</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/cart">Количка</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/profile">Профил</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/market" state={{ city: "София" }}>
              Пазарувай
            </StyledLink>
          </ListItem>
          <ListItem>__________</ListItem>
          <ListItem>__________</ListItem>
          <ListItem>__________</ListItem>
          <ListItem>__________</ListItem>
          <ListItem>__________</ListItem>
          <ListItem>__________</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Контакти</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> ул. „Николай Лилиев“ 18, 1421
          ж.к. Лозенец, София
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +359 123 45 6789
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@harvest-hub.bg
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
