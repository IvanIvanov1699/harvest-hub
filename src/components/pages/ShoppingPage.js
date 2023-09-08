import { useLocation } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../common/Footer";
import Copyright from "../common/Copyright";
import Items from "../common/Items";
import { useState } from "react";

const Container = styled.div`
  // background-color: #fff333;
`;

const Top = styled.div`
  background: url("/assets/Images/FiltersBG.png");
  background-size: 25%;
  height: 8rem;
  padding: 2rem 0px;
`;

const ItemsContainer = styled.div`
  background-color: #f1f1f1;
  width: 100%;
  min-height: 47.1vh;
`;

const NavbarPadding = styled.div`
  height: 4.5rem;
  width: 100%;
`;

const FilterContainer = styled.div`
  height: 6vh;
  margin: 0rem 0px 1rem 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: stretch;
  padding: 0.2rem;
  border-radius: 10px;
  background-color: white;
  border: 2px solid;
`;

const Input = styled.input`
  border: none;
  font-size: 25px;
  margin-left: 0.75rem;
  width: 500px;
  outline: none;
`;

const FilterOptions = styled.div`
  display: flex;
  align-items: center;
`;

const FilterText = styled.span`
  font-size: 35px;
  font-weight: 600;
  margin-right: 20px;
  color: white;
  text-shadow: 4px 4px black;
  white-space: nowrap;
  letter-spacing: 3px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 6px;
  font-size: 25px;
  border: 2px solid;
`;

const Option = styled.option``;

const ShoppingPage = () => {
  const location = useLocation();
  let city;
  if (location.state != null) {
    city = location.state.city;
  }

  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedCategory, setSelectedCategory] = useState("Всички Категории");
  const [selectedSorting, setSelectedSorting] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container>
      <NavbarPadding />
      <Top>
        <FilterContainer>
          <SearchContainer>
            <Input
              placeholder="Търсене"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <SearchIcon style={{ color: "gray", fontSize: 50 }} />
          </SearchContainer>

          <FilterOptions>
            <FilterText>Филтри:</FilterText>
            <Select
              defaultValue={city}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <Option value="София">София</Option>
              <Option value="Варна">Варна</Option>
              <Option value="Пловдив">Пловдив</Option>
              <Option value="Бургас">Бургас</Option>
              <Option value="Русе">Русе</Option>
              <Option value="Стара Загора">Стара Загора</Option>
            </Select>

            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <Option selected>Всички Категории</Option>
              <Option>Плодове & Зеленчуци</Option>
              <Option>Месо</Option>
              <Option>Млечни & Яйца</Option>
              <Option>Цветя и Растения</Option>
              <Option>Напитки</Option>
            </Select>

            <Select
              value={selectedSorting}
              onChange={(e) => setSelectedSorting(e.target.value)}
            >
              <Option value="newest" selected>
                Най-нови
              </Option>
              <Option value="lowToHigh">Цена: ниска към висока</Option>
              <Option value="highToLow">Цена: висока към ниска</Option>
            </Select>
          </FilterOptions>
        </FilterContainer>
      </Top>
      <ItemsContainer>
        <Items
          city={selectedCity}
          selectedCategory={selectedCategory}
          selectedSorting={selectedSorting}
          searchQuery={searchQuery}
        />
      </ItemsContainer>
      <Footer />
      <Copyright />
    </Container>
  );
};

export default ShoppingPage;
