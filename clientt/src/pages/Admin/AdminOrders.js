import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Select } from 'antd';
import moment from 'moment';
const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState([
      "Not Process",
      "Processing",
      "Shipped",
      "deliverd",
      "cancel",
    ]);
    const [changeStatus, setCHangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/all-orders?${Date.now()}`);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (auth?.token) getOrders();
    }, [auth?.token]);
  
    const handleChange = async (orderId, value) => {
      try {
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/order-status/${orderId}`, {
          status: value,
        });
        getOrders();
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <Layout title={"All Orders Data"}>
        <div className="row dashboard">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
                const productsArray = JSON.parse(o?.products || '[]'); 
              return (
                <div className="border shadow" >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col"> date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
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
                        {/* <td>{o?.products?.length}</td> */}
                        <td>{productsArray.length}</td>
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
                            <p>Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  };

export default AdminOrders