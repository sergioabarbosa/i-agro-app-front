// src/components/ApiComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const ProductsComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setData(response.data);
        console.log('Dados da API:', response.data)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <View>
      <Text>Exibindo produtos da API:</Text>
      {data.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

export default ProductsComponent;
