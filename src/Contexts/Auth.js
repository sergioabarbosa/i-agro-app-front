import React, { createContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar o AsyncStorage

import { API, createSession, getUsers } from "../Services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const recoveredUser = await AsyncStorage.getItem("user");
        
        if (recoveredUser) {
          setUser(JSON.parse(recoveredUser));
        }
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar usuário: ", error);
      }
    };

    loadUser();
  }, []);

  const checkAuthAndNavigate = async () => {
  try {
    const storedUser = await AsyncStorage.getItem('user');
    const storedToken = await AsyncStorage.getItem('token');

    if (storedUser && storedToken) {
      const loggedUser = JSON.parse(storedUser);
      const token = storedToken;

      API.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(loggedUser);
      navigation.navigate('Products');
    }

    setAuthChecked(true); // Marca a verificação de autenticação como concluída
  } catch (error) {
    console.error("Erro ao verificar autenticação: ", error);
  }
};

useEffect(() => {
  checkAuthAndNavigate();
}, []);

  const login = async (email, password) => {
   try {
    const response = await createSession(email, password);
    const newUser = await getUsers(response.data.users);
    const loggedUser = newUser.find((user) => user.email === email);
    const token = response.data.access_token;

    await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    await AsyncStorage.setItem('token', token);

    API.defaults.headers.Authorization = `Bearer ${token}`;
    setUser(loggedUser);
    navigation.navigate('Products');
  } catch (error) {
    console.error("Erro ao fazer login: ", error);
  }
};


  const SignUp = async (name, email, usertype, photo, password, confirmPassword) => {
    try {
      // Seu código de cadastro aqui
    } catch (error) {
      console.error("Erro ao se cadastrar: ", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('token');
      API.defaults.headers.Authorization = null;

      setUser(null);
      navigation.navigate('/auth/login');
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated: !!user, user, login, logout, loading, SignUp }}>
      {children}
    </AuthContext.Provider>
  );
}
