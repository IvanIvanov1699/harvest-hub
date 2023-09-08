import styled from "styled-components";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import * as React from "react";
import Popover from "@mui/material/Popover";
import { CartContext } from "./CartContext";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 70px;
`;

const ItemForm = styled.form`
  padding: 10px;
  margin: 10px;
  height: 20rem;
  width: 20rem;
  display: flex;
  background-color: lightgray;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
`;

const ImgContainer = styled.div`
  width: 80%;
  height: 80%;
`;

const PriceSpan = styled.span`
  font-weight: 500;
  font-size: 17px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  z-index: 1;
  background-color: white;
`;

const Bot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  margin: 3px 0px 6px 0px;
  gap: 10px;
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AmountInput = styled.input`
  flex: 1;
  width: 50px;
  border-color: teal;
`;

const AddButton = styled.button`
  flex: 1;
  background-color: aliceblue;
  border: none;
  margin-left: 10px;
  padding: 2px 10px;
  border: 2px solid;
  border-radius: 15px;
  border-color: teal;
  font-weight: 500;
  transition: 0.1s ease;
  &:hover {
    background-color: teal;
    color: aliceblue;
  }
`;

const DescConainer = styled.div`
  flex: 1;
  background-color: aliceblue;
  padding: 0px 0px;
  border-radius: 50%;
  border: none;
  border-color: teal;
`;

const ItemTitle = styled.span`
  cursor: default;
  font-weight: 500;
  margin-top: 2px;
`;

const PopoverSpan = styled.span`
  font-weight: 550;
  font-size: 17px;
  padding: 3px 7px;
`;

const StyledAlert = styled(Alert)`
  height: 1px;
  width: 1px;
`;

const Items = ({ city, selectedCategory, selectedSorting, searchQuery }) => {
  const cart = React.useContext(CartContext);
  const [amounts, setAmounts] = React.useState([]);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:5163/api/Item")
      .then((response) => {
        setItems(response.data);
        const initialAmounts = response.data.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {});
        setAmounts(initialAmounts);
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(
    items.reduce((acc, item) => {
      acc[item.id] = null;
      return acc;
    }, {})
  );

  const handlePopoverOpen = (event, itemId) => {
    // Set the anchor element for the specific item ID
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [itemId]: event.currentTarget,
    }));
  };

  const handlePopoverClose = (itemId) => {
    // Set the anchor element to null for the specific item ID
    setAnchorEl((prevAnchorEl) => ({
      ...prevAnchorEl,
      [itemId]: null,
    }));
  };

  const isPopoverOpen = (itemId) => Boolean(anchorEl[itemId]);

  // Step 1: Add state variable to store amounts for each form

  // Step 2: Event handler to update the amount for a specific form
  const handleAmountChange = (event, itemId) => {
    const value = event.target.value;
    // Ensure the value is within the range of 0 to 100
    const newValue = Math.min(999, Math.max(1, value));

    // Update the state with the new value
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [itemId]: newValue,
    }));

    setStyledOpen(true);
  };

  // Step 3: Event handler to handle the form submission for a specific form
  const handleFormSubmit = (event, itemId) => {
    event.preventDefault(); // Prevent the default form submission and page refresh
    const amount = amounts[itemId]; // Get the amount for the specific form
    // Perform any logic or action you need with the amount value here
    console.log(`Form ID: ${itemId}, Amount: ${amount}`);
    cart.addMultipleToCart(itemId, amount);
    setOpen(true);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [styledOpen, setStyledOpen] = React.useState(true);
  const handleStyledClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStyledOpen(false);
  };

  console.log(amounts);

  return (
    <Container>
      {items
        .filter((item) => item.region === city)
        .filter(
          (item) =>
            selectedCategory === "Всички Категории" ||
            item.category === selectedCategory
        )
        .filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          if (selectedSorting === "lowToHigh") {
            return a.price - b.price;
          } else if (selectedSorting === "highToLow") {
            return b.price - a.price;
          } else {
            return b.id - a.id;
          }
        })
        .map((item) => (
          <ItemForm
            key={item.id}
            onSubmit={(event) => handleFormSubmit(event, item.id)}
          >
            <ImgContainer>
              <Image src={item.imgSrc} />
            </ImgContainer>
            <ItemTitle>{item.title}</ItemTitle>
            <Bot>
              <Left>
                <AmountInput
                  placeholder="1"
                  type="number"
                  value={amounts[item.id]}
                  onChange={(event) => handleAmountChange(event, item.id)}
                />
                <AddButton type="submit">Добави</AddButton>
                <Snackbar
                  autoHideDuration={1000}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  open={open}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                  >
                    Добавено Успешно!
                  </Alert>
                </Snackbar>
                <Snackbar
                  autoHideDuration={1}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  open={styledOpen}
                  onClose={handleStyledClose}
                >
                  <StyledAlert
                    onClose={handleStyledClose}
                    severity="success"
                    variant="filled"
                  >
                    ||||||||||
                  </StyledAlert>
                </Snackbar>
              </Left>
              <PriceSpan>{item.price.toFixed(2)} лв.</PriceSpan>
              <DescConainer
                aria-owns={isPopoverOpen(item.id) ? item.id : undefined}
                aria-haspopup="true"
                onMouseEnter={(e) => handlePopoverOpen(e, item.id)}
                onMouseLeave={() => handlePopoverClose(item.id)}
              >
                <InfoIcon style={{ fontSize: 30 }} />
              </DescConainer>
              <Popover
                id={`${item.id}-popover`}
                sx={{
                  pointerEvents: "none",
                }}
                open={isPopoverOpen(item.id)}
                anchorEl={anchorEl[item.id]}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                onClose={() => handlePopoverClose(item.id)}
                disableRestoreFocus
              >
                <PopoverSpan>{item.description}</PopoverSpan>
              </Popover>
            </Bot>
          </ItemForm>
        ))}
    </Container>
  );
};

export default Items;
