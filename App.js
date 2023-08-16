import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importe o NavigationContainer
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from './src/Contexts/Auth';
import LoginComponent from './src/components/LoginComponente';
import ProductsComponent from './src/components/ProductsComponent';
import UsersComponent from './src/components/UsersComponent';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Products" component={ProductsComponent} />
          <Stack.Screen name="Users" component={UsersComponent} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default App;
