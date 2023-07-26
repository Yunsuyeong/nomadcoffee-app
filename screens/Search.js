import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";

const Title = styled.Text`
  color: white;
  font-size: 20px;
`;

const Search = () => {
  return (
    <ScreenLayout>
      <Title>Search</Title>
    </ScreenLayout>
  );
};

export default Search;
