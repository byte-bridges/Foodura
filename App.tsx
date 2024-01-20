/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainStack from './App/navigation/mainStack';
import Toast from 'react-native-toast-message';
import {NavigationContainer} from '@react-navigation/native';

function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
