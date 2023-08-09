// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UsersScreen from '../components/UsersComponent';
import ProductsScreen from '../components/ProductsComponent';
import LoginScreen from '../components/LoginComponente';

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Users" component={UsersScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
