import { styled } from "styled-components/native";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { gql, useMutation } from "@apollo/client";
import DismissKeyboard from "../components/DismissKeyboard";
import { ReactNativeFile } from "apollo-upload-client";

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;

const Photo = styled.Image`
  height: 350px;
`;

const ShopContainer = styled.View`
  flex: 1;
  gap: 10px;
  margin-top: 20px;
  padding: 10px;
`;

const Name = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const Create_Shop_Mutation = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $category: String
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      category: $category
    ) {
      ok
      error
    }
  }
`;

const UploadForm = ({ route, navigation }) => {
  const updateCreateShop = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;
    if (createCoffeeShop.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeCoffeeShops(prev) {
            return [createCoffeeShop, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [createShop, { loading }] = useMutation(Create_Shop_Mutation, {
    update: updateCreateShop,
  });
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { control, handleSubmit } = useForm();
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const categoryRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = ({ name, latitude, longitude, category }) => {
    const file = new ReactNativeFile({
      uri: route?.params?.photoLocal,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    createShop({
      variables: {
        name,
        latitude,
        longitude,
        category,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <Photo
          resizeMode="contain"
          source={{ uri: route?.params?.photoLocal }}
        />
        <ShopContainer>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Name
                placeholder="Write Shop's name"
                placeholderColor="rgba(0, 0, 0, 0.5)"
                returnKeyType="done"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={() => onNext(latitudeRef)}
              />
            )}
          />
          <Controller
            name="latitude"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Name
                ref={latitudeRef}
                placeholder="Write Shop's latitude"
                placeholderColor="rgba(0, 0, 0, 0.5)"
                returnKeyType="done"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={() => onNext(longitudeRef)}
              />
            )}
          />
          <Controller
            name="longitude"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Name
                ref={longitudeRef}
                placeholder="Write Shop's longitude"
                placeholderColor="rgba(0, 0, 0, 0.5)"
                returnKeyType="done"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={() => onNext(categoryRef)}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Name
                ref={categoryRef}
                placeholder="Write Shop's category"
                placeholderColor="rgba(0, 0, 0, 0.5)"
                returnKeyType="done"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                onSubmitEditing={handleSubmit(onValid)}
              />
            )}
          />
        </ShopContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadForm;
