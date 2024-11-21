import React, {useState} from 'react';
import {KeyboardTypeOptions, TextInput, View} from 'react-native';
import {customInput} from '../../assets/css/main';

type TextInputType = {
  placeholder: string;
  value: string;
  readonly?: boolean;
  setValue?: (value: string) => void;
  secureTextEntry?: boolean;
  isFocus?: boolean;
  type?: KeyboardTypeOptions;
  style?: any;
};
const CustomInput: React.FC<TextInputType> = ({
  placeholder,
  value,
  setValue,
  secureTextEntry,
  isFocus,
  type = 'default',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(isFocus);
  return (
    <View style={[customInput.container]}>
      <TextInput
        style={
          isFocused
            ? {...customInput.input, ...customInput.focusedInput, ...style}
            : {...customInput.input, ...customInput.unFocusedInput, ...style}
        }
        placeholder={placeholder}
        value={value as string}
        keyboardType={type}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default CustomInput;
