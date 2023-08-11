import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import Shop from "../components/Shop";

const See_Shops_Query = gql`
  query seeCoffeeShops($lastId: Int!) {
    seeCoffeeShops(lastId: $lastId) {
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

const Home = () => {
  const { data, loading, refetch, fetchMore } = useQuery(See_Shops_Query, {
    variables: {
      lastId: 0,
    },
  });
  console.log(data);
  const renderShop = ({ item: shop }) => {
    return <Shop {...shop} />;
  };
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: { lastId: 0 },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeCoffeeShops}
        keyExtractor={(shop) => "" + shop.id}
        renderItem={renderShop}
      />
    </ScreenLayout>
  );
};

export default Home;
