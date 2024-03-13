import { memo } from "react";
import { Text, TextInput, View } from "react-native";

const InputEmailField = ({
  styles,
  title,
  value,
  placeholder,
  onChangeText,
}) => {
  return (
    <View className={styles}>
      {title && <Text className="text-sm mb-2">{title}</Text>}
      <TextInput
        placeholder={placeholder}
        value={value}
        inputMode="email"
        className="bg-white py-2 px-4 rounded-md"
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default memo(InputEmailField);
