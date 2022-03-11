import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#FA3E82" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
