import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { Alert, Image, StatusBar, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  justify-content: space-around;
  align-items: center;
  padding: 0px 50px;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`;

const TakeShopBtn = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.8);
`;

const SliderContainer = styled.View``;

const ActionsContainer = styled.View`
  flex-direction: row;
  gap: 30px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const ShopAction = styled.TouchableOpacity`
  background-color: white;
  border-radius: 4px;
  padding: 5px 10px;
`;

const ShopActionText = styled.Text`
  font-weight: 600;
`;

const TakeShop = ({ navigation }) => {
  const camera = useRef();
  const [takenShop, setTakenShop] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const getPermissions = async () => {
    const { granted } = Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onZoomChange = (v) => {
    setZoom(v);
  };
  const onFlashChange = () => {
    if (flash === Camera.Constants.FlashMode.off) {
      setFlash(Camera.Constants.FlashMode.on);
    } else if (flash === Camera.Constants.FlashMode.on) {
      setFlash(Camera.Constants.FlashMode.auto);
    } else if (flash === Camera.Constants.FlashMode.auto) {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };
  const goUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenShop);
    }
    navigation.navigate("UploadForm", {
      file: takenShop,
    });
  };
  const onUpload = () => {
    Alert.alert("Save Shop?", "Save shop & Upload or Just Upload?", [
      {
        text: "Save & Upload",
        onPress: () => goUpload(true),
      },
      {
        text: "Just Upload",
        onPress: () => goUpload(false),
      },
    ]);
  };
  const onSaveUpload = () => {
    () => goUpload(true);
  };
  const onCameraReady = () => setCameraReady(true);
  const takeShop = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenShop(uri);
    }
  };
  const onDismiss = () => setTakenShop("");
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenShop === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flash}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseButton>
        </Camera>
      ) : (
        <Image source={{ uri: takenShop }} style={{ flex: 1 }} />
      )}
      {takenShop === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 100, height: 50 }}
              minimumValue={0}
              maximumValue={0.5}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255,255,255,0.5)"
              onValueChange={onZoomChange}
            />
          </SliderContainer>
          <TakeShopBtn onPress={takeShop} />
          <ButtonsContainer>
            <ActionsContainer>
              <TouchableOpacity
                onPress={onFlashChange}
                style={{ marginRight: 10 }}
              >
                <Ionicons
                  name={
                    flash === Camera.Constants.FlashMode.on
                      ? "flash"
                      : flash === Camera.Constants.FlashMode.auto
                      ? "eye"
                      : flash === Camera.Constants.FlashMode.off
                      ? "flash-off"
                      : ""
                  }
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={onSwitch}>
                <Ionicons
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <Actions>
          <ShopAction onPress={onDismiss}>
            <ShopActionText>Dismiss</ShopActionText>
          </ShopAction>
          <ShopAction onPress={onUpload}>
            <ShopActionText>Upload</ShopActionText>
          </ShopAction>
          <ShopAction onPress={onSaveUpload}>
            <ShopActionText>Save & Upload</ShopActionText>
          </ShopAction>
        </Actions>
      )}
    </Container>
  );
};

export default TakeShop;
