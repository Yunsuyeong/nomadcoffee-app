import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { colors } from "../colors";
import * as MediaLibrary from "expo-media-library";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

const SelectShop = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [shops, setShops] = useState([]);
  const [chosenShop, setChosenShop] = useState("");
  const getShops = async () => {
    const { assets: shops } = await MediaLibrary.getAssetsAsync();
    setShops(shops);
    setChosenShop(shops[0]?.uri);
  };
  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getShops();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getShops();
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          photoLocal,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, [ok]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenShop, photoLocal]);
  const numColumns = 2;
  const { width } = useWindowDimensions();
  const [photoLocal, setPhotoLocal] = useState("");
  const chooseShop = async (id) => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(id);
    setPhotoLocal(assetInfo.localUri);
    setChosenShop(assetInfo.uri);
  };
  const renderShop = ({ item: shop }) => (
    <ImageContainer onPress={() => chooseShop(shop.id)}>
      <Image
        source={{ uri: shop.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        {shop.uri === chosenShop ? (
          <Ionicons name="checkmark-outline" size={18} color={colors.blue} />
        ) : null}
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenShop !== "" ? (
          <Image
            source={{ uri: chosenShop }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          numColumns={numColumns}
          data={shops}
          keyExtractor={(shop) => shop.id}
          renderItem={renderShop}
        />
      </Bottom>
    </Container>
  );
};

export default SelectShop;
