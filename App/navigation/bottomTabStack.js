import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen';
import CartScreen from '../screens/cartScreen';
import {Image, Text, TouchableOpacity} from 'react-native';
import {PRIMARY_COLOR} from '../constants/colors';
import ProfileScreen from '../screens/profile';
import globalStyles from '../utils/typography';
import ShowToast from '../components/toast';
import {clearAsyncStorage} from '../utils/localStorage/AsyncStorage';
import {CART, USER} from '../constants/asyncStorageKeys';

const BottomTabStack = ({navigation}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: PRIMARY_COLOR,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <CustomIcon source={require('../assets/images/home.png')} />
            ) : (
              <CustomIcon
                source={require('../assets/images/home-inactive.png')}
              />
            ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          headerTitleStyle: {...globalStyles.headline2, fontSize: 20},
          headerStyle: {backgroundColor: PRIMARY_COLOR},
          tabBarIcon: ({focused}) =>
            focused ? (
              <CustomIcon
                source={require('../assets/images/grocery-store.png')}
              />
            ) : (
              <CustomIcon
                source={require('../assets/images/grocery-store-inactive.png')}
              />
            ),
        }}
        name="Cart"
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 12}}
              onPress={async () => {
                await clearAsyncStorage([CART, USER]);
                ShowToast('Success', 'Logout successfully');
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Starting'}], // Name of the screen you want to navigate to after logout
                });
              }}>
              <Text style={globalStyles.headline3}>Logout ➜</Text>
            </TouchableOpacity>
          ),
          headerTitleStyle: {...globalStyles.headline2, fontSize: 20},
          headerStyle: {backgroundColor: PRIMARY_COLOR},
          tabBarIcon: ({focused}) =>
            focused ? (
              <CustomIcon source={require('../assets/images/user.png')} />
            ) : (
              <CustomIcon
                source={require('../assets/images/user-inactive.png')}
              />
            ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;

const CustomIcon = ({source}) => {
  return <Image source={source} style={{height: 24, width: 24}} />;
};

//#929292
