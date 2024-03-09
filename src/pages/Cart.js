import { View, SafeAreaView, ScrollView, Text } from "react-native";
import { Banner } from "../components/Slider";

const CartPage = ({ navigation }) => {
  return (
    <ScrollView stickyHeaderHiddenOnScroll={true} scrollsToTop={true}>
      <View>
        {/* <ProductSlide navigation={navigation} /> */}
        <Text>Cart page</Text>
      </View>
    </ScrollView>
  );
};

export default CartPage;
