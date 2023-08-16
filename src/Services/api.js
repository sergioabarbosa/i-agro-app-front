import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const createSession = async (email, password) => {
  const request =  await API.post("/auth/login", { email, password })
  console.log(request);
  return request;
};

export const createUser = async (name, email, usertype, password, confirmpassword) => {
  const request = await API.post("/register", { name, email, usertype, password, confirmpassword });
  console.log(request);
  return request;
};

export const getUsers = async (token) => {
  const request = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(request.data);
  localStorage.setItem("users", JSON.stringify(request.data));
  return request.data;
};
getUsers().then((users) => console.log(users));

export const getUser = async (token, id) => {
  const request = await API.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(request.data);
  return request.data;
};
getUser().then((user) => console.log(user)); 

export const updateUser = async (token, id, name, email, password) => {
  const request = await API.patch(`/users/${id}`, { name, email, password }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(request.data);
  return request.data;
}
updateUser().then((user) => console.log(user));

export const updateUserAccess = async (token) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;
  const request = await API.put(`/users/${userId}/access`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(request.data);
  return request.data;
};

export const getProducts = async (token, id) => {
  const request = await API.get(`/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(request.data);
  return request.data;
};
getProducts().then((user) => console.log(user));