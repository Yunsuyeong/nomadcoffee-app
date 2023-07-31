import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Image, useWindowDimensions } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  border: 1px solid blue;
  margin-bottom: 15px;
`;

const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const Shopname = styled.Text`
  color: white;
  font-weight: 600;
`;

const ShopImg = styled.Image``;

const Categories = styled.View`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const Category = styled.Text`
  color: white;
  font-weight: 500;
`;

const Shop = ({ id, name, photos, categories }) => {
  const shopUrl = photos[0]?.url;
  const { width, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height + 100);
  const [imageWidth, setImageWidth] = useState(width + 50);
  useEffect(() => {
    Image.getSize(shopUrl, (width, height) => {
      setImageHeight(height / 2.5);
      setImageWidth(width / 2.5);
    });
  }, [shopUrl]);
  return (
    <Container>
      <Header>
        <Shopname>{name}</Shopname>
      </Header>
      <ShopImg
        resizeMode="cover"
        style={{ width: imageWidth, height: imageHeight }}
        source={{ uri: shopUrl }}
      />
      <Categories>
        {categories?.map((category) => (
          <Category key={category?.id}>Category : {category?.name}</Category>
        ))}
      </Categories>
    </Container>
  );
};

Shop.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  /* photos: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }), */
  /* categories: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }), */
};

export default Shop;
