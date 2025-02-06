import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {customInput} from '@assets/css/main';
import Icons from '@utils/imagePaths/imagePaths';

type TextInputType = {
  placeholder: string;
  value: string | number;
  readonly?: boolean;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  secureTextEntry?: boolean;
  isFocus?: boolean;
  type?: KeyboardTypeOptions;
  style?: any;
};

const CustomInput: React.FC<TextInputType> = ({
  placeholder,
  value,
  setValue,
  secureTextEntry = false,
  isFocus,
  type = 'default',
  style,
}) => {
  const [isFocused, setIsFocused] = useState(isFocus);
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const handleInputChange = (text: string) => {
    if (type === 'number-pad') {
      const filteredText = text.replace(/[^0-9]/g, '');
      if (filteredText.length <= 11) {
        setValue?.(filteredText);
      }
    } else {
      setValue?.(text);
    }
  };

  return (
    <View style={[customInput.container, styles.container]}>
      <TextInput
        style={[
          isFocused
            ? {...customInput.input, ...customInput.focusedInput, ...style}
            : {...customInput.input, ...customInput.unFocusedInput, ...style},
          styles.input,
        ]}
        placeholder={placeholder}
        value={value as string}
        keyboardType={type}
        onChangeText={handleInputChange}
        secureTextEntry={isSecure}
        placeholderTextColor="#999"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setIsSecure(!isSecure)}>
          {isSecure ? (
            <Icons.EyeClose width={20} height={20} />
          ) : (
            <Icons.EyeOpen width={20} height={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    paddingRight: 40, // Add padding to make space for the icon
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -10}],
  },
});

export default CustomInput;
