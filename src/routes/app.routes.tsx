import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();

import Dashboard from '@screens/Dashboard';
import ShowDetail from '@screens/ShowDetail';

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#169ddb',
        height: 48,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Buscar Série"
      component={Dashboard}
      options={{ title: 'Buscar Série' }}
    />
    <HomeStack.Screen
      name="ShowDetail"
      component={ShowDetail}
      options={{ title: 'Série Indicada' }}
    />
  </HomeStack.Navigator>
);

const AppRoutes: React.FC = () => <HomeStackScreen />;

export default AppRoutes;
