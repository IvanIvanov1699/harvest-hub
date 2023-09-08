import { useState } from "react";
import styled from "styled-components";

const StyledFormInput = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40%;
  flex: 1;
`;

const StyledLabelRegister = styled.label`
  color: rgb(255, 255, 255);
  text-shadow: 2px 2px rgb(48, 64, 15);
  margin: 3px;
`;

const StyledInputRegister = styled.input`
  margin: 10px 0;
  padding: 10px;
  border-color: darkgray;
  border-radius: 15px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.55);

  &:invalid[focused="true"] ~ .span-register {
    display: block;
  }

  &:invalid[focused="true"] {
    border: 3px solid rgba(255, 0, 0, 0.621);
    color: rgb(54, 0, 0);
    text-shadow: 1px 1px rgb(226, 0, 0);
  }
`;

const StyledSpanRegister = styled.span`
  padding: 3px;
  color: rgb(54, 0, 0);
  display: none;
`;

function FormInput(props) {
  const { label, errorMessage, onChange, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <StyledFormInput>
      <StyledLabelRegister>{label}</StyledLabelRegister>
      <StyledInputRegister
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <StyledSpanRegister className="span-register">
        {errorMessage}
      </StyledSpanRegister>
    </StyledFormInput>
  );
}

export default FormInput;
