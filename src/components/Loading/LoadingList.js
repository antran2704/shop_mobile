import { ActivityIndicator } from "react-native";

const LoadingList = ({ loading }) => {
  if (loading) {
    return <ActivityIndicator size={"large"} />;
  }

  return;
};

export default LoadingList;
