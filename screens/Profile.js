import { gql, useMutation, useReactiveVar } from "@apollo/client";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import AuthButton from "../components/AuthButton";
import AuthLayout from "../components/AuthLayout";
import { TextInput } from "../components/AuthShared";
import { isLoggedInVar, LogUserIn } from "../apollo";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components";

const Log_In_Mutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
`;

const Profile = ({ route: { params } }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { control, handleSubmit, formState, setError } = useForm({
    mode: "onChange",
    defaultValues: {
      username: params?.username,
      password: params?.password,
    },
  });
  const PasswordRef = useRef();
  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
      await LogUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(Log_In_Mutation, {
    onCompleted,
  });
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (loading) {
      return;
    }
    login({
      variables: { ...data },
    });
  };
  return !isLoggedIn ? (
    <AuthLayout>
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Username"
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            autoCapitalize={"none"}
            returnKeyType="next"
            onSubmitEditing={() => onNext(PasswordRef)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            placeholderTextColor={"rgba(255,255,255,0.8)"}
            secureTextEntry
            returnKeyType="done"
            lastOne={true}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <AuthButton
        text="Log in"
        loading={loading}
        disabled={!formState.isValid}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  ) : (
    <ScreenLayout>
      <Title>Profile</Title>
    </ScreenLayout>
  );
};

export default Profile;
