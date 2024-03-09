import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { formatBigNumber } from "../helpers/number/fomatterCurrency";
import CartItem from "../components/Cart/CartItem";
import { useState } from "react";

const CartPage = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>
      <FlatList
        horizontal={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        onEndReached={() => {}}
        onEndReachedThreshold={0.8}
        renderItem={({ item }) => <CartItem navigation={navigation}/>}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
};

export default CartPage;
