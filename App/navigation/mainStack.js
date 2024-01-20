import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SignUpScreen from '../screens/signUpScreen';
import LoginScreen from '../screens/loginScreen';
import StartingScreen from '../screens/startingScreen';
import ProductDetailsScreen from '../screens/productDetailScreen';
import BottomTabStack from './bottomTabStack';
import {ActivityIndicator, View} from 'react-native';
import {PRIMARY_COLOR} from '../constants/colors';

const MainStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Starting'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Starting" component={StartingScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={BottomTabStack} />
      <Stack.Screen name="ProductDetail" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;

export const Loader = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator color={PRIMARY_COLOR} />
    </View>
  );
};
