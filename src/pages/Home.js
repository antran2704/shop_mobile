import { View, SafeAreaView, ScrollView } from "react-native";
import { Banner } from "../components/Slider";
import ProductSlide from "../components/Product/ProductSlide";

const HomePage = ({ navigation }) => {
  return (
    <ScrollView stickyHeaderHiddenOnScroll={true} scrollsToTop={true}>
      <Banner />

      <View>
        <ProductSlide navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default HomePage;
