import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetail = ({ userId }) => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    // Fetch user orders when the component mounts
    axios.get(`${process.env.REACT_APP_API}/api/get-user-orders/${userId}`)
      .then((response) => {
        setUserOrders(response.data.orders);
      })
      .catch((error) => {
        console.error('Error fetching user orders:', error);
      });
  }, [userId]); // Fetch orders when userId changes

  return (
    <div>
      <h3>User Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {userOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetail;
