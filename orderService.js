// src/api/orderService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/orders'; // Make sure this matches your server
export const loginUser = (email, password) => {
  return axios.post('http://localhost:5000/api/login', { email, password })
    .then(res => res.data)
    .catch(err => {
      console.error("🚨 Login Axios Error:", err.response?.data);
      throw err;
    });
};

export const fetchOrders = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await axios.post(BASE_URL, orderData);
  return res.data;
};

export const updateOrder = async (id, orderData) => {
  const res = await axios.put(`${BASE_URL}/${id}`, orderData);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
};
