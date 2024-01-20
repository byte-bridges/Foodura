import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {PRIMARY_COLOR} from '../../constants/colors';
import globalStyles from '../../utils/typography';
import CustomButton from '../../components/button';
import CustomTextInput from '../../components/textInput';
import {getData, storeData} from '../../utils/localStorage/AsyncStorage';
import ShowToast from '../../components/toast';
import {USER, USERS_LIST} from '../../constants/asyncStorageKeys';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (
      name.trim().length !== 0 &&
      email.trim().length !== 0 &&
      password.trim().length !== 0
    ) {
      const data = {
        id: new Date(),
        name: name?.trim(),
        email: email?.trim().toLowerCase(),
        password: password?.trim(),
      };
      const usersList = await getData(USERS_LIST);
      if (usersList) {
        const searchUser = usersList.filter(
          item =>
            item?.email?.trim().toLowerCase() === email?.trim().toLowerCase(),
        );
        if (searchUser.length > 0) {
          ShowToast(
            'Email already registered',
            'Please register with other email ',
          );
        } else {
          usersList.push(data);
          await storeData(USERS_LIST, usersList);
          await storeData(USER, data);
          setEmail('');
          setName('');
          setPassword('');
          navigation.navigate('Home');
        }
      } else {
        await storeData(USERS_LIST, [data]);
        await storeData(USER, data);
        setEmail('');
        setName('');
        setPassword('');
        navigation.navigate('Home');
      }
    } else {
      ShowToast(
        name.trim().length === 0
          ? 'Name Required'
          : email.trim().length === 0
          ? 'Email Required'
          : 'Password Required',
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
      <Text style={[globalStyles.headline, {marginBottom: 24}]}>Sign Up</Text>
      <CustomTextInput value={name} onChangeText={setName} placeholder="Name" />
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
        title={'Sign Up ➜'}
        containerStyle={{width: '45%'}}
        onPress={handleSignUp}
      />
      <Text style={{...globalStyles.subTitles, marginTop: 16, fontSize: 16}}>
        Already have an account?{' '}
        <Text
          onPress={() => navigation.navigate('Login')}
          style={globalStyles.headline3}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default SignUpScreen;
