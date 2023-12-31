import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Select } from 'antd';
import moment from 'moment';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import './AdminOrders.scss';
import { getOrders, updateOrderStatus } from '../Service/AdminOrderService';
import toast from 'react-hot-toast';
const { Option } = Select;


const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const fetchOrders  = async () => {
    try {
      // const { data } = await axios.get(`${process.env.REACT_APP_API}/api/all-orders?${Date.now()}`);
      const data = await getOrders(); // Gọi hàm từ service
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      // const { data } = await axios.put(`${process.env.REACT_APP_API}/api/order-status/${orderId}`, {
      //   status: value,
      // });
      const data = await updateOrderStatus(orderId, value); // Gọi hàm từ service
      if (data.success) {
        fetchOrders();
        toast.success(data.message); 
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LayoutAdmin title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            const productsArray = JSON.parse(o?.products || '[]');
            const totalQuantity = productsArray.reduce((total, product) => total + product.quantity, 0);
            const totalPrice = productsArray.reduce((total, product) => total + product.price * product.quantity, 0);

            return (
              <div className="border shadow" key={o.id}>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o.id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer_name}</td>
                      <td>{moment(o?.created_at).fromNow()}</td>
                      <td>{o?.payment.success ? "Failed" : "Success"}</td>
                      <td>{totalQuantity}</td>
                      {/* <td>${totalPrice.toFixed(2)}</td> */}
                      <td>{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {productsArray.map((p, j) => (
                    <div className="row mb-2 p-3 card flex-row" key={p.id}>
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height="100px"
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price: ${p.price} x {p.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default AdminOrders;

