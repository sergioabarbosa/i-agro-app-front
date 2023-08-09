import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Importe o NavigationContainer
import { View, StyleSheet } from 'react-native';
import { AuthProvider } from './src/Contexts/Auth';
import LoginComponent from './src/components/LoginComponente';
import ProductsComponent from './src/components/ProductsComponent';
import UsersComponent from './src/components/UsersComponent';

const App = () => {
  return (
    <NavigationContainer> {/* Envolve toda a sua aplicação com NavigationContainer */}
      <AuthProvider>
        <View style={styles.container}>
          <LoginComponent />
          <ProductsComponent />
          <UsersComponent />
        </View>
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
