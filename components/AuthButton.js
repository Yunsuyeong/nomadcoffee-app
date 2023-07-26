import React from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { ActivityIndicator } from "react-native";

const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.blue};
  padding: 13px 10px;
  margin-top: 20px;
  border-radius: 5px;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const AuthButton = ({ onPress, disabled, text, loading }) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
};

export default AuthButton;
