import { Modal, TextField } from "@mui/material";
import { useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  height: 80%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1``;

const Hr = styled.hr``;

const Body = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const DeleteButton = styled.button`
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

const ModalDeleteContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const ProfileDeletion = () => {
  const [openWarning, setOpenWarning] = useState(false);
  const handleOpenWarning = () => setOpenWarning(true);
  const handleCloseWarning = () => setOpenWarning(false);

  const handleDeleteAccount = () => {};

  return (
    <Container>
      <TitleContainer>
        <Title>Изтриване на Акаунт</Title>
      </TitleContainer>
      <Hr />
      <Body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Title>ВНИМАНИЕ!</Title>
          <Title>Изтриването на акаунта е перманентно!</Title>
        </div>
        <DeleteButton onClick={handleOpenWarning}>ИЗТРИВАНЕ</DeleteButton>
      </Body>
      <StyledModal
        open={openWarning}
        onClose={handleCloseWarning}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBody>
          <ModalTitle style={{ fontSize: "32px" }}>
            СИГУРНИЛИ СТЕ ЧЕ ИСКАТЕ ДА ИЗТРИЕТЕ АКАУНТА СИ?
          </ModalTitle>
          <Hr style={{ width: "90%", marginBottom: "20px" }} />
          <TextField
            label="Потвърдете с парола"
            type="password"
            variant="outlined"
          />
          <ModalDeleteContainer>
            <ModalDeleteButtonYes onClick={handleDeleteAccount}>
              ДА
            </ModalDeleteButtonYes>
            <ModalDeleteButtonNo onClick={handleCloseWarning}>
              НЕ
            </ModalDeleteButtonNo>
          </ModalDeleteContainer>
        </ModalBody>
      </StyledModal>
    </Container>
  );
};

export default ProfileDeletion;
