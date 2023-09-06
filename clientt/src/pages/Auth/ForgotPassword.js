import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/forgot-password`,
                { email, password, answer }
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        // }catch(e){
        //     console.log(e);
        //     toast.error("Something went wrong");
        // }
    }
  return (
    <Layout title={'Forgot Password - Ecommerce App'}>
        <div className="form-container" style={{ minHeight: "90vh" }}>
            <form onSubmit={handleSubmit}>
                <h4>Reset Password </h4>
                <div className="mb-3">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your Email'
                    
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your secret answer'
                    
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder='Enter your Password'
                    
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword