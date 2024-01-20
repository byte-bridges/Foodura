import React from 'react';
import {TextInput} from 'react-native';
import styles from './styles';
import {DISABLED_COLOR} from '../../constants/colors';

const CustomTextInput = ({
  onChangeText,
  value,
  placeholder = 'Placeholder',
  style,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      style={[styles.container, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={DISABLED_COLOR}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default CustomTextInput;
