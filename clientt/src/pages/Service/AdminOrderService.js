// orderService.js
import axios from 'axios';

const getOrders = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/all-orders?${Date.now()}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const { data } = await axios.put(`${process.env.REACT_APP_API}/api/order-status/${orderId}`, {
      status,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getOrders, updateOrderStatus };
