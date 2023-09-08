import {
  Alert,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import { styled } from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Container = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1``;

const Hr = styled.hr``;

const Body = styled.div``;

const Button = styled.button`
  width: 22vw;
  font-size: 22px;
  padding: 12px 15px;
  background-color: teal;
  border: solid 2px;
  border-color: black;
  color: white;
  margin: 15px 0px;
  border-radius: 15px;
  transition: 0.1s ease-in;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);
  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
    color: gray;
    border-color: gray;
  }
  &:not([disabled]):hover {
    background-color: white;
    color: teal;
  }
`;

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

const ModalForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
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
`;

const TextFieldContainer = styled.div`
  margin: 10px 5px;
  width: 44%;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  height: 100%;
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

const ProfileAddresses = () => {
  const [openCreateNew, setOpenCreateNew] = useState(false);
  const handleOpenCreateNew = () => setOpenCreateNew(true);
  const handleCloseCreateNew = () => setOpenCreateNew(false);

  const [openListModal, setOpenListModal] = useState(false);
  const handleOpenListModal = (address) => {
    setSelectedAddress(address); // Set the selected address
    setOpenListModal(true);
  };
  const handleCloseListModal = () => setOpenListModal(false);

  const [openWarning, setOpenWarning] = useState(false);
  const handleCloseWarning = () => setOpenWarning(false);

  const [addressList, setAddressList] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState({}); // Store the selected address

  const [addressToDelete, setAddressToDelete] = useState(null);

  const handleDeleteClick = (addressId) => {
    setAddressToDelete(addressId); // Set the address ID to delete
    setOpenWarning(true); // Open the warning modal
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `http://localhost:5163/api/Address/${addressToDelete}`
      );
      setAddressList((prevList) =>
        prevList.filter((address) => address.id !== addressToDelete)
      );
      // Update your addressList or perform any other necessary actions here
      console.log(`Address with ID ${addressToDelete} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting address:", error);
      setOpenAlert(true);
    } finally {
      setAddressToDelete(null); // Reset the addressToDelete state
      setOpenWarning(false); // Close the warning modal
    }
  };

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const tokenData = jwtDecode(token.result);
  const username =
    tokenData["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
    phoneNumber: "",
    email: "",
    extraInfo: "",
    username: username,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
    console.log(username);
  };

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
        .get(`http://localhost:5163/api/Address/${username}`)
        .then((response) => {
          // Map over the data and remove the "user" property
          const modifiedData = response.data.map((address) => {
            const { user, ...rest } = address;
            return rest;
          });
          setAddressList(modifiedData);
          console.log(addressList);
        })
        .catch((error) => {
          console.error("Error fetching item data:", error);
        });
    }
  }, [username]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5163/api/Address", {
        name: formData.firstName,
        lastName: formData.lastName,
        province: formData.province,
        city: formData.city,
        postalCode: formData.postalCode,
        streetAddress: formData.address,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        extraInfo: formData.extraInfo,
        userName: formData.username,
      });

      axios
        .get(`http://localhost:5163/api/Address/${username}`)
        .then((response) => {
          const modifiedData = response.data.map((address) => {
            const { user, ...rest } = address;
            return rest;
          });
          setAddressList(modifiedData);
          console.log(addressList);
        })
        .catch((error) => {
          console.error("Error fetching item data:", error);
        });

      // Handle successful response, e.g., display a success message
      console.log("Data posted successfully:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        province: "",
        city: "",
        postalCode: 0,
        address: "",
        phoneNumber: "",
        email: "",
        extraInfo: "",
      });

      setOpenCreateNew(false);
    } catch (error) {
      setOpenAlert(true);
      console.error("Error posting data:", error);
    }
  };

  return (
    <Container>
      <TitleContainer>
        <Title>Вашите Адреси</Title>
      </TitleContainer>
      <Hr />
      <Body>
        <FixedSizeList
          height={351}
          width={1400}
          itemSize={50}
          itemCount={addressList.length}
          overscanCount={5}
        >
          {({ index, style }) => (
            <ListItem
              style={style}
              key={addressList[index].id}
              component="div"
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(addressList[index].id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemButton
                onClick={() => handleOpenListModal(addressList[index])}
              >
                <ListItemText
                  primary={
                    addressList[index].name +
                    " " +
                    addressList[index].lastName +
                    " | " +
                    addressList[index].streetAddress +
                    " | " +
                    addressList[index].phoneNumber
                  }
                />
              </ListItemButton>
            </ListItem>
          )}
        </FixedSizeList>
      </Body>
      <Button onClick={handleOpenCreateNew}>ДОБАВИ НОВ АДРЕС</Button>
      <StyledModal
        open={openCreateNew}
        onClose={handleCloseCreateNew}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBody>
          <ModalTitle>ДОБАВИ НОВ АДРЕС</ModalTitle>
          <Hr style={{ width: "94%" }} />
          <ModalForm onSubmit={handleSubmit}>
            <TextFieldContainer>
              <StyledTextField
                label="Име"
                variant="outlined"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer>
              <StyledTextField
                label="Фамилия"
                variant="outlined"
                name="lastName"
                required
                value={formData.lastNameName}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer>
              <StyledTextField
                label="Община"
                variant="outlined"
                name="province"
                required
                value={formData.province}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer>
              <StyledTextField
                label="Град"
                variant="outlined"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer>
              <StyledTextField
                label="Пощенски Код"
                variant="outlined"
                type="number"
                name="postalCode"
                required
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer>
              <StyledTextField
                label="Адрес"
                variant="outlined"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer>
              <StyledTextField
                label="Телефонен Номер"
                variant="outlined"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer>
              <StyledTextField
                label="Имейл"
                variant="outlined"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <TextFieldContainer style={{ width: "94%" }}>
              <StyledTextField
                label="Допълнителна Информация"
                variant="outlined"
                multiline
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleInputChange}
              />
            </TextFieldContainer>
            <Button type="submit">ДОБАВИ АДРЕС</Button>
          </ModalForm>
        </ModalBody>
      </StyledModal>
      <StyledModal
        open={openListModal}
        onClose={handleCloseListModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBody>
          <ModalTitle>ИНФОРМАЦИЯ ЗА АДРЕСА</ModalTitle>
          <Hr style={{ width: "94%" }} />
          <ModalInformation>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>Име: {selectedAddress.name}</ModalInfoText>{" "}
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Фамилия: {selectedAddress.lastName}
              </ModalInfoText>{" "}
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Община: {selectedAddress.province}
              </ModalInfoText>{" "}
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>Град: {selectedAddress.city}</ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Пощенски Код: {selectedAddress.postalCode}
              </ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Адрес : {selectedAddress.streetAddress}
              </ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>
                Телефонен Номер: {selectedAddress.phoneNumber}
              </ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer>
              {" "}
              <ModalInfoText>Имейл: {selectedAddress.email}</ModalInfoText>
            </ModalInfoContainer>
            <ModalInfoContainer style={{ width: "94%" }}>
              {" "}
              <ModalInfoText>
                Допълнителна Информация: {selectedAddress.extraInfo}
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
            СИГУРНИЛИ СТЕ ЧЕ ИСКАТЕ ДА ИЗТРИЕТЕ АДРЕСА?
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

export default ProfileAddresses;
