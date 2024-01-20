import React from 'react';
import styles from './styles';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = ({containerStyle, title, titleStyle, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
