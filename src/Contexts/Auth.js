import React, { createContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
// import { NavigationContainer } from '@react-navigation/native';

import { API, createSession, getUsers } from "../Services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await createSession(email, password);
    const newUser = await getUsers(response.data.users);
    const loggedUser = newUser.find((user) => user.email === email);
    console.log(newUser);
    
    console.log("login", response.data);

    console.log("loggedUser", loggedUser);
    const token = response.data.token;

    localStorage.setItem('user', JSON.stringify(loggedUser));
    localStorage.setItem('token', token);

    API.defaults.headers.Authorization = `Bearer ${token}`;
      setUser(loggedUser);
      navigation.navigate('/products');
  };

  const SignUp = async (name, email, usertype, photo, password, confirmPassword) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, usertype, photo, password, confirmPassword})
    };

    fetch('http://localhost:3000/auth/register', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));  

  };

  const logout = () => {
    console.log('logout');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    API.defaults.headers.Authorization = null;

    setUser(null);
    navigation.navigate('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ authenticated:!!user, user, login,
    logout, loading, SignUp }}>
      {children}
    </AuthContext.Provider>
  );
}
