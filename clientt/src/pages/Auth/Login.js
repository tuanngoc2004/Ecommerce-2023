import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Login.scss";
import { useAuth } from '../../context/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/login`,
                { email, password }
            );
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));

                // Check if the user's role is 3 (locked account)
                if (res.data.user && res.data.user.role_as === 3) {
                    // Redirect to a locked account page or show a message
                    navigate('/locked-account');
                } else {
                    // Redirect to the original intended location
                    navigate(location.state || "/");
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong");
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleCreateAccount = () => {
        navigate('/register');
    }

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    }

    return (
        <Layout title={"Login - Ecommer App"}>
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit} className='login-form'>
                    <h4>Login Form</h4>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder='Enter your Email'
                            // required
                        />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder='Enter your Password'
                            required
                        />
                    </div> */}
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder='Enter your Password'
                                // required
                            />
                            <FaEye
                                className="eye-icon"
                                onClick={toggleShowPassword}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary login">
                        Login
                    </button>

                    {/* <div className="mb-3">
                        <button type="button" className="btn btn-primary mt-3 fg-pass" onClick={(e) => { navigate('/forgot-password') }}>
                            Forgot Password
                        </button>
                    </div> */}

                    <p style={{ textAlign: "right", marginTop: "10px" }}>
                        <small
                            className="create-account-link"
                            onClick={handleCreateAccount}
                            style={{
                            color: "blue", 
                            textDecoration: "underline", 
                            cursor: "pointer", 
                            }}
                        >
                            Don't have Account, create Account
                        </small>
                    </p>
                    <p style={{ textAlign: "right", marginTop: "10px" }}>
                        <small
                            className="create-account-link"
                            onClick={handleForgotPassword}
                            style={{
                            color: "blue", 
                            textDecoration: "underline", 
                            cursor: "pointer", 
                            }}
                        >
                            Forgot Password
                        </small>
                    </p>
                </form>
            </div>
        </Layout>
    )
}

export default Login;

