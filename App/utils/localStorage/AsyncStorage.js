import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('STORING DATA INTO ASYNC STORAGE ERROR:', e);
  }
};

export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('READING DATA FROM ASYNC STORAGE ERROR:', e);
  }
};

export const clearAsyncStorage = async keys => {
  try {
    await AsyncStorage.multiRemove(keys);
    console.log('Async Storage cleared successfully.');
  } catch (error) {
    console.error('Error clearing Async Storage:', error);
  }
};
