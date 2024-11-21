import React from 'react';
import {Text, StyleSheet, TextProps, TextStyle} from 'react-native';

interface CustomTextProps extends TextProps {
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({style, children, ...props}) => {
  const stylo = {
    // ...style,
    fontFamily: 'Outfit-Regular !important',
  };
  // console.log(stylo);
  return (
    <Text
      {...props}
      style={
        // {...stylo}
        {fontFamily: 'Outfit-Regular !important', ...style} // Set font explicitly here
        // styles.text,
        // style,
      }>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#000', // Optional: set a default color to confirm if styles are applied
  },
});

export default CustomText;
