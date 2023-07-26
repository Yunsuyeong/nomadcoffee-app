import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";

const Title = styled.Text`
  color: white;
  font-size: 20px;
`;

const Home = () => {
  return (
    <ScreenLayout>
      <Title>Home</Title>
    </ScreenLayout>
  );
};

export default Home;
