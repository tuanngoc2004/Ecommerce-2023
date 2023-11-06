import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "./CartStyles.scss";

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const [clientToken, setClientToken] = useState("");
    const navigate = useNavigate();

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total += item.price * item.quantity;
            });
            return total.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Increase quantity of an item in the cart
    const increaseQuantity = (pid) => {
      const maxQuantity = 10; 
      const updatedCart = cart.map(item => {
          if (item.id === pid) {
              const newQuantity = item.quantity + 1;
              return { ...item, quantity: newQuantity > maxQuantity ? maxQuantity : newQuantity };
          }
          return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

    // Decrease quantity of an item in the cart
    const decreaseQuantity = (pid) => {
      const updatedCart = cart.map(item => {
          if (item.id === pid) {
              const newQuantity = item.quantity - 1;
              return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
          }
          return item;
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    // Decrease quantity of an item in the cart
    // const decreaseQuantity = (pid) => {
    //   const updatedCart = cart.map(item => {
    //       if (item.id === pid) {
    //           // Kiểm tra xem số lượng hiện tại đã là 1 hoặc thấp hơn 1 chưa
    //           if (item.quantity <= 1) {
    //               return item; // Nếu là 1 hoặc thấp hơn 1, không thay đổi
    //           }
    //           const newQuantity = item.quantity - 1;
    //           return { ...item, quantity: newQuantity };
    //       }
    //       return item;
    //   });
    //   setCart(updatedCart);
    //   localStorage.setItem("cart", JSON.stringify(updatedCart));
    // }


    //delete item
    const removeCartItem = (pid) => {
        const updatedCart = cart.filter(item => item.id !== pid);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    //get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
    }, [auth?.token]);

    //handle payments
    const handlePayment = async () => {
        try {
            setLoading(true);
            if (!instance || !cart || !auth || !auth.token || !auth.user.address) {
                throw new Error('Missing required data for payment.');
            }

            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/product/braintree/payment`, {
                nonce,
                cart,
            });

            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="cart-page">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2 mb-1">
                            {!auth?.user
                                ? "Hello Guest"
                                : `Hello  ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className="text-center">
                            {cart?.length ?
                                `You have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout"}`
                                : "Your cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 p-0 m-0">
                            {
                                cart?.map((item) => (
                                    <div key={item.id} className="row mb-2 p-3 card flex-row">
                                        <div className="col-md-4">
                                            <img
                                                src={`${process.env.REACT_APP_API}/api/product/product-photo/${item.id}?${Date.now()}`}
                                                alt={item.name}
                                                className="card-img-top"
                                                width="100%"
                                                height={"130px"}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <p>{item.name.substring(0, 20)}....</p>
                                            <p>{item.description.substring(0, 40)}...</p>
                                            <p>Price: {item.price.toLocaleString("vi-VN", {
                                              style: "currency",
                                              currency: "VND",
                                            })}</p>
                                            
                                        </div>
                                        <div className="col-md-4 cart-remove-btn">
                                            <div className="quantity-controls">
                                                <button className="btn btn-sm btn-danger" onClick={() => decreaseQuantity(item.id)} style={{ marginRight: '5px' }}>-</button>
                                                <span>{item.quantity}</span>
                                                <button className="btn btn-sm btn-success" onClick={() => increaseQuantity(item.id)} style={{ marginLeft: '5px' ,marginRight: '20px' }}>+</button>
                                            </div>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => removeCartItem(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-5 cart-summary">
                            <h2>Cart Summary</h2>
                            <p>Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total : {totalPrice()} </h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="mb-3">
                                    {auth?.token ? (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => navigate("/dashboard/user/profile")}
                                        >
                                            Update Address
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() =>
                                                navigate("/login", {
                                                    state: "/cart",
                                                })
                                            }
                                        >
                                            Please Login to checkout
                                        </button>
                                    )}
                                </div>
                            )}
                            <div className="mt-2">
                                {!clientToken || !auth?.token || !cart?.length || auth?.user?.role_as === 3 ? (
                                    ""
                                ) : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault",
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            onClick={handlePayment}
                                            style={{ marginBottom: '50px' }}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage;
