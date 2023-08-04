import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Search_Shops_Query = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      latitude
      longitude
      photos(lastId: $lastId) {
        id
        url
      }
      categories(lastId: $lastId) {
        id
        name
      }
    }
  }
`;

const SearchContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const SearchText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 10px;
`;

const Input = styled.TextInput`
  width: ${(props) => props.width / 1.5}px;
  color: black;
  background-color: rgba(255, 255, 255, 1);
  padding: 5px 10px;
  border-radius: 10px;
`;

const Search = ({ navigation }) => {
  const numColumns = 2;
  const { width } = useWindowDimensions();
  const { control, handleSubmit } = useForm();
  const [SearchShops, { data, loading, called }] =
    useLazyQuery(Search_Shops_Query);
  const onValid = ({ keyword }) => {
    console.log(data);
    SearchShops({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Controller
      name="keyword"
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          width={width}
          placeholderTextColor="rgba(0,0,0,0.8)"
          placeholder="Search Shops"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          onSubmitEditing={handleSubmit(onValid)}
        />
      )}
    />
  );
  const renderShop = ({ item: shop }) => (
    <TouchableOpacity>
      <Image
        source={{ uri: shop?.photos[0]?.url }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading ? (
          <SearchContainer>
            <ActivityIndicator size="large" />
            <SearchText>Loading...</SearchText>
          </SearchContainer>
        ) : null}
        {!called ? (
          <SearchContainer>
            <SearchText>Search by title or category</SearchText>
          </SearchContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data?.searchCoffeeShops?.length === 0 ? (
            <SearchContainer>
              <SearchText>Could not find anything</SearchText>
            </SearchContainer>
          ) : (
            <FlatList
              data={data?.searchCoffeeShops}
              keyExtractor={(shop) => "" + shop?.id}
              renderItem={renderShop}
              numColumns={numColumns}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
