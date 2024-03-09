import { Text, View } from "react-native";

const AboutPage = ({route}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="px-5 py-5 text-blue-400">About Page {route.params.user}</Text>
    </View>
  );
};

export default AboutPage;
