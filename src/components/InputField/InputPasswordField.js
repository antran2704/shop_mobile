import { useState, memo } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const InputPasswordField = ({
  styles,
  title,
  value,
  placeholder,
  onChangeText,
  maxLength = 20,
}) => {
  const [show, setShow] = useState(false);
  return (
    <View className={styles}>
      {title && <Text className="text-sm mb-2">{title}</Text>}
      <View className="relative">
        <TextInput
          placeholder={placeholder}
          value={value}
          inputMode="text"
          maxLength={maxLength}
          secureTextEntry={!show}
          className="bg-white py-2 pl-4 pr-12 rounded-md"
          onChangeText={onChangeText}
        />

        <TouchableOpacity
          onPress={() => setShow(!show)}
          className="absolute bottom-1/3 right-4"
        >
          {!show && (
            <MaterialCommunityIcons name="eye" size={16} color={"#f8796c"} />
          )}
          {show && (
            <MaterialCommunityIcons
              name="eye-off"
              size={16}
              color={"#f8796c"}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(InputPasswordField);
