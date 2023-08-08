// App.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProductsComponents from './src/components/ProductsComponent';

const App = () => {
  return (
    <View style={styles.container}>
      <ProductsComponents />
    </View>
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
