import styled from "styled-components";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/DeleteForever";
import Subtract from "@mui/icons-material/Remove";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import axios from "axios";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 4;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  align-self: center;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductDescription = styled.span``;

const ProductRegion = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`;

const DeleteItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  padding-right: 15px;
`;

const DeleteItemButton = styled.button`
  background-color: #800020;
  color: white;
  height: 50px;
  width: 50px;
  transition: 0.25s ease;
  &:hover {
    background-color: #d90000;
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;

  flex: 3;
`;

const ProductAmount = styled.div`
  font-size: 35px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const AmountButton = styled.button`
  margin: 0px 10px;
  background-color: teal;
  color: white;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: 0.1s ease;
  &:hover {
    color: teal;
    background-color: white;
  }
`;

const Hr = styled.hr`
  margin-right: 20px;
`;

const CartItem = (props) => {
  const cart = useContext(CartContext);
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function getItemData() {
      try {
        const response = await axios.get("http://localhost:5163/api/Item");
        const allItems = response.data;
        const searchedItem = allItems.find((a) => a.id === props.id);

        if (searchedItem) {
          setItem({
            id: searchedItem.id,
            title: searchedItem.title,
            description: searchedItem.description,
            category: searchedItem.category,
            region: searchedItem.region,
            imgSrc: searchedItem.imgSrc,
            price: searchedItem.price,
          });
        }
      } catch (error) {
        console.error("Error while loading items", error);
      }
    }

    getItemData();
  }, [props.id, props.quantity]);

  const handleDelete = () => {
    cart.deleteFromCart(item.id);
  };

  if (!item) {
    return null;
  }

  return (
    <>
      <Product>
        <ProductDetail>
          <Image src={item.imgSrc} />
          <Details>
            <ProductName>
              <b>Продукт:</b> {item.title}
            </ProductName>
            <ProductDescription>
              <b>Описание:</b> {item.description}
            </ProductDescription>
            <ProductRegion>
              <b>Регион: </b> {item.region}
            </ProductRegion>
            <ProductPrice>{item.price} лв.</ProductPrice>
          </Details>
        </ProductDetail>
        <PriceDetail>
          <ProductAmountContainer>
            <AmountButton onClick={() => cart.addOneToCart(props.id)}>
              <Add />
            </AmountButton>
            <ProductAmount>{props.quantity}</ProductAmount>
            <AmountButton onClick={() => cart.removeOneFromCart(props.id)}>
              <Subtract />
            </AmountButton>
          </ProductAmountContainer>
          <DeleteItemContainer>
            <DeleteItemButton onClick={handleDelete}>
              <Delete />
            </DeleteItemButton>
          </DeleteItemContainer>
        </PriceDetail>
      </Product>
      <Hr />
    </>
  );
};

export default CartItem;
