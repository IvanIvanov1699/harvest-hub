import { useCookies } from "react-cookie";
import { styled } from "styled-components";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Snackbar,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import CancelIcon from "@mui/icons-material/HighlightOff";

const Container = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div``;

const Title = styled.h1``;

const Hr = styled.hr``;

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  background-color: white;
  border: 5px solid lightgray;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
  padding: 15px;
`;
const ModalTitle = styled.h1`
  margin-top: 5px;
`;

const ModalInformation = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ModalInfoContainer = styled.div`
  margin: 10px 5px;
  width: 44%;
  border: solid 1px lightgray;
  border-radius: 10px;
  padding: 5px;
`;

const ModalInfoText = styled.span`
  font-weight: 500;
  font-size: 24px;
  white-space: pre-line;
`;

const ModalDeleteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ModalDeleteButtonYes = styled.button`
  height: 70px;
  width: 20%;
  font-weight: 500;
  font-size: 40px;
  border: none;
  margin: 20px 0px;
  border-radius: 20px;
  background-color: #800020;
  color: white;
  transition: 0.15s ease-in;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
  &:hover {
    background-color: #d90000;
  }
`;

const ModalDeleteButtonNo = styled.button`
  height: 70px;
  width: 20%;
  font-weight: 500;
  font-size: 40px;
  border: none;
  margin: 20px 0px;
  border-radius: 20px;
  background-color: green;
  color: white;
  transition: 0.15s ease-in;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
  &:hover {
    background-color: yellowgreen;
  }
`;

const ProfileOrders = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const tokenData = jwtDecode(token.result);
  const username =
    tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  const [orderList, setOrderList] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState({});

  const [openListModal, setOpenListModal] = useState(false);
  const handleOpenListModal = (order) => {
    setSelectedOrder(order); // Set the selected address
    setOpenListModal(true);
  };
  const handleCloseListModal = () => setOpenListModal(false);

  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleCancelClick = (addressId) => {
    setOrderToDelete(addressId); // Set the address ID to delete
    setOpenWarning(true); // Open the warning modal
  };

  const [openWarning, setOpenWarning] = useState(false);
  const handleCloseWarning = () => setOpenWarning(false);

  const [openAlert, setOpenAlert] = useState(false);
  const handleAlertClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    if (username) {
      axios
        .get(`http://localhost:5163/api/Order/${username}`)
        .then((response) => {
          // Map over the data and remove the "user" property
          const modifiedData = response.data.map((order) => {
            const { user, ...rest } = order;
            return rest;
          });
          setOrderList(modifiedData);
        })
        .catch((error) => {
          console.error("Error fetching item data:", error);
        });
    }
  }, [username]);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5163/api/Order/${orderToDelete}`);
      setOrderList((prevList) =>
        prevList.filter((order) => order.id !== orderToDelete)
      );
      // Update your addressList or perform any other necessary actions here
      console.log(`Order with ID ${orderToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting address:", error);
      setOpenAlert(true);
    } finally {
      setOrderToDelete(null); // Reset the addressToDelete state
      setOpenWarning(false); // Close the warning modal
    }
  };

  console.log(orderList);

  return (
    <Container>
      <TitleContainer>
        <Title>Вашите Поръчки</Title>
      </TitleContainer>
      <Hr />
      <Body>
        <FixedSizeList
          height={351}
          width={1417}
          itemSize={50}
          itemCount={orderList.length}
          overscanCount={5}
        >
          {({ index, style }) => (
            <ListItem
              style={style}
              key={orderList[index].id}
              component="div"
              disablePadding
              secondaryAction={
                <IconButton
                  title="Отказ"
                  edge="end"
                  aria-label="Cancel"
                  onClick={() => handleCancelClick(orderList[index].id)}
                >
                  <CancelIcon />
                </IconButton>
              }
            >
              <ListItemButton
                title="Детайли"
                onClick={() => handleOpenListModal(orderList[index])}
              >
                <ListItemText
                  primary={
                    orderList[index].addressFull +
                    " | " +
                    orderList[index].recipientFullName +
                    " | " +
                    orderList[index].paymentMethod +
                    " - " +
                    orderList[index]?.price?.toFixed(2) +
                    " лв. | Статус: " +
                    orderList[index].status
                  }
                />
              </ListItemButton>
            </ListItem>
          )}
        </FixedSizeList>
      </Body>
      <StyledModal
        open={openListModal}
        onClose={handleCloseListModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBody>
          <ModalTitle>ИНФОРМАЦИЯ ЗА ПОРЪЧКАТА</ModalTitle>
          <Hr style={{ width: "94%" }} />
          <ModalInformation>
            <ModalInfoContainer style={{ width: "94%" }}>
              {" "}
              <ModalInfoText>
                Ценоразпис: {"\n"}{" "}
                {selectedOrder?.orderFull?.replace(/\s\|\|\s/g, "\n")}
              </ModalInfoText>{" "}
            </ModalInfoContainer>
            <ModalInfoContainer style={{ width: "94%" }}>
              {" "}
              <ModalInfoText>
                Адрес: {selectedOrder.addressFull}
              </ModalInfoText>{" "}
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Получател: {selectedOrder.recipientFullName}
              </ModalInfoText>{" "}
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Телефон: {selectedOrder.recipientPhoneNumber}
              </ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Имейл: {selectedOrder.recipientEmail}
              </ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Начин на плащане: {selectedOrder.paymentMethod}
              </ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Крайна цена: {selectedOrder?.price?.toFixed(2)} лв.
              </ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>Статус: {selectedOrder.status}</ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer style={{ width: "94%" }}>
              {" "}
              <ModalInfoText>
                Допълнителна инофрмация за адреса на доставка:{" \n"}
                {selectedOrder.addressExtraInfo}
              </ModalInfoText>
            </ModalInfoContainer>
          </ModalInformation>
        </ModalBody>
      </StyledModal>
      <StyledModal
        open={openWarning}
        onClose={handleCloseWarning}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBody>
          <ModalTitle style={{ fontSize: "32px" }}>
            СИГУРНИЛИ СТЕ ЧЕ ИСКАТЕ ДА ОТКАЖЕТЕ ПОРЪЧКАТА?
          </ModalTitle>
          <Hr style={{ width: "90%" }} />
          <ModalDeleteContainer>
            <ModalDeleteButtonYes onClick={handleDeleteConfirm}>
              ДА
            </ModalDeleteButtonYes>
            <ModalDeleteButtonNo onClick={handleCloseWarning}>
              НЕ
            </ModalDeleteButtonNo>
          </ModalDeleteContainer>
        </ModalBody>
      </StyledModal>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity="error" variant="filled">
          Грешка!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfileOrders;
