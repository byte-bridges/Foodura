import React from 'react';
import Toast from 'react-native-toast-message';

const ShowToast = (title, subTitle) => {
  return Toast.show({
    type: 'info',
    text1: title,
    text2: subTitle,
    visibilityTime: 2500,
  });
};

export default ShowToast;
