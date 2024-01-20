import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {PRIMARY_COLOR} from '../../constants/colors';
import CustomButton from '../../components/button';
import CustomTextInput from '../../components/textInput';
import globalStyles from '../../utils/typography';
import ShowToast from '../../components/toast';
import {USER, USERS_LIST} from '../../constants/asyncStorageKeys';
import {getData, storeData} from '../../utils/localStorage/AsyncStorage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (email.trim().length !== 0 && password.trim().length !== 0) {
      const usersList = await getData(USERS_LIST);
      if (usersList) {
        const user = usersList.filter(
          user =>
            user.email === email?.trim().toLowerCase() &&
            user.password === password.trim(),
        );
        if (user.length > 0) {
          setEmail('');
          setPassword('');
          await storeData(USER, user[0]);
          navigation.navigate('Home');
        } else {
          ShowToast('Invalid Credentials');
        }
      } else {
        ShowToast('User not found', 'Please enter correct credentials');
      }
    } else {
      ShowToast(
        email.trim().length === 0 ? 'Email Required' : 'Password Required',
        'All fields are required',
      );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PRIMARY_COLOR,
        padding: 24,
      }}>
      <Text style={[globalStyles.headline, {marginBottom: 24}]}>Sign In</Text>
      <CustomTextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <CustomTextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />
      <CustomButton
        title={'Sign In ➜'}
        containerStyle={{width: '45%'}}
        onPress={handleSignIn}
      />
      <Text style={{...globalStyles.subTitles, marginTop: 16, fontSize: 16}}>
        Don't have an account?{' '}
        <Text
          onPress={() => navigation.navigate('SignUp')}
          style={globalStyles.headline3}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
