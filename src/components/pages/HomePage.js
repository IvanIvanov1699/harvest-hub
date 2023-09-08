import styled from "styled-components";
import Slider from "../common/Slider";
import Newsletter from "../common/Newsletter";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import Locations from "../common/Locations";

const Conatiner = styled.div``;

const NavbarPadding = styled.div`
  height: 4.5rem;
  width: 100%;
`;

const Wrapper = styled.div``;

function HomePage() {
  return (
    <Conatiner>
      <NavbarPadding />
      <Wrapper>
        <Slider />
        <Locations />
        <Newsletter />
        <Footer />
        <Copyright />
      </Wrapper>
    </Conatiner>
  );
}

export default HomePage;
