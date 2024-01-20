import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import styles from './style';
import CustomButton from '../../components/button';
import {getData} from '../../utils/localStorage/AsyncStorage';
import {Loader} from '../../navigation/mainStack';
import {USER} from '../../constants/asyncStorageKeys';

const StartingScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const getDataFromStorage = async () => {
    setLoading(true);
    const data = await getData(USER);
    if (data) {
      navigation.navigate('Home');
    }
    setLoading(false);
  };
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      getDataFromStorage();
    });
    return () => focus;
  }, [navigation]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.mainContainer}>
      <Image
        style={{height: 200, width: 200, marginTop: -100, marginBottom: 24}}
        source={require('../../assets/images/foodura-logo.png')}
      />
      <Text style={styles.welComeText}>Welcome to the</Text>
      <Text style={styles.appText}>FOODURA</Text>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title={'Login'}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <CustomButton
          title={'Sign Up'}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    </View>
  );
};

export default StartingScreen;
