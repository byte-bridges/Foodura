import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {getData} from '../../utils/localStorage/AsyncStorage';
import {PRIMARY_COLOR} from '../../constants/colors';
import globalStyles from '../../utils/typography';
import {USER} from '../../constants/asyncStorageKeys';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState({});
  const getDataFromStorage = async () => {
    const data = await getData(USER);

    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      getDataFromStorage();
    });
    return () => focus;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text style={{...globalStyles.headline, color: PRIMARY_COLOR}}>
        {user?.name}
      </Text>
      <Text style={{...globalStyles.subTitles, color: PRIMARY_COLOR}}>
        {user?.email}
      </Text>
    </View>
  );
};

export default ProfileScreen;
