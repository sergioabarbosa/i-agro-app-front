// src/components/ApiComponent.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const UsersComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setData(response.data);
        console.log('Dados da API:', response.data)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <View>
      <Text>Exibindo usuários da API:</Text>
      {data.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

export default UsersComponent;
