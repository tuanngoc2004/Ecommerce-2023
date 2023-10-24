import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/orders?${Date.now()}`);
      setOrders(data);
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={'Your Orders'}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((o, i) => {
                const productsArray = JSON.parse(o?.products || '[]'); // Parse products

                // Tính tổng số lượng sản phẩm trong đơn hàng
                let totalQuantity = 0;

                // Tính tổng số tiền
                let totalAmount = 0;

                productsArray.forEach((p) => {
                  totalQuantity += p.quantity;
                  totalAmount += p.price * p.quantity;
                });

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
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer_name}</td>
                          <td>{moment(o?.created_at).fromNow()}</td>
                          <td>{o?.payment?.success ? 'Failed' : 'Success'}</td>
                          <td>{totalQuantity}</td> {/* Hiển thị tổng số lượng */}
                          <td>{totalAmount.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD"
                          })}</td> {/* Hiển thị tổng số tiền */}
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
                            Price: ${p.price} x {p.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No orders available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Orders;


// import React, { useEffect, useState } from 'react';
// import Layout from '../../components/Layout/Layout';
// import UserMenu from '../../components/Layout/UserMenu';
// import { useAuth } from '../../context/auth';
// import axios from 'axios';
// import moment from 'moment';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [auth, setAuth] = useAuth();

//   const getOrders = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/orders?${Date.now()}`);
//       setOrders(data);
//       // const response = await axios.get(`${process.env.REACT_APP_API}/api/orders?${Date.now()}`);
//       // const data = response.data;

//       // if (Array.isArray(data)) {
//       //   // If the data is already an array, set it directly
//       //   setOrders(data);
//       //   console.log("Orders exist:", data);
//       // } else if (typeof data === 'object') {
//       //   // If the data is an object, convert it to an array
//       //   const orderArray = Object.values(data);
//       //   setOrders(orderArray);
//       //   console.log("Orders exist:", orderArray);
//       // } else {
//       //   console.log("No orders available. Data received:", data);
//       // }
//     } catch (error) {
//       console.log('Error fetching orders:', error);
//     }
//   };

//   useEffect(() => {
//     if (auth?.token) getOrders();
//   }, [auth?.token]);

//   return (
//     <Layout title={'Your Orders'}>
//       <div className="container-fluid p-3 m-3 dashboard">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//           <div className="col-md-9">
//             <h1 className="text-center">All Orders</h1>
//             {Array.isArray(orders) && orders.length > 0 ? (
//               orders.map((o, i) => {
//                 console.log('Order data:', o);
//                 // const buyerName = o?.buyer_id?.name || 'N/A';
//                 const productsArray = JSON.parse(o?.products || '[]'); // Parse products

//                 return (
//                   <div className="border shadow" key={o.id}>
//                     <table className="table">
//                       <thead>
//                         <tr>
//                           <th scope="col">#</th>
//                           <th scope="col">Status</th>
//                           <th scope="col">Buyer</th>
//                           <th scope="col">Date</th>
//                           <th scope="col">Payment</th>
//                           <th scope="col">Quantity</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         <tr>
//                           <td>{i + 1}</td>
//                           <td>{o?.status}</td>
//                           <td>{o?.buyer_name}</td>
//                           <td>{moment(o?.created_at).fromNow()}</td>
//                           <td>{o?.payment?.success ? 'Failed' : 'Success'}</td>
//                           {/* Use productsArray instead of o?.products */}
//                           <td>{productsArray.length}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                     <div className="container">
//                       {productsArray.map((p, j) => (
//                         <div className="row mb-2 p-3 card flex-row" key={p.id}>
//                           <div className="col-md-4">
//                             <img
//                               src={`${process.env.REACT_APP_API}/api/product/product-photo/${p.id}?${Date.now()}`}
//                               className="card-img-top"
//                               alt={p.name}
//                               width="100px"
//                               height="100px"
//                             />
//                           </div>
//                           <div className="col-md-8">
//                             <p>{p.name}</p>
//                             <p>{p.description.substring(0, 30)}</p>
//                             <p>Price : {p.price}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <p>No orders available.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };
// export default Orders;
