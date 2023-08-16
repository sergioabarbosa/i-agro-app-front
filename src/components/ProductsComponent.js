import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ProductsComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setData(response.data);
        console.log('Dados da API:', response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exibindo produtos da API:</Text>
      <ScrollView contentContainerStyle={styles.productList}>
        {data.map(item => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productInfo}>Categoria: {item.category}</Text>
            <Text style={styles.productInfo}>Disponível: {item.available}</Text>
            <Text style={styles.productInfo}>Marca: {item.brand}</Text>
            <Text style={styles.productPrice}>Preço: ${item.price}</Text>
            <Text style={styles.productInfo}>Quantidade: {item.quantity}</Text>
            <Text style={styles.productInfo}>ID do Produto: {item.id}</Text>
            <Text style={styles.productInfo}>ID do Usuário: {item.userId}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productList: {
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    width: '90%',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  productInfo: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 8,
  },
});

export default ProductsComponent;
