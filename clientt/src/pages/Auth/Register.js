import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "./Register.scss";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Sử dụng react-icons

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false); // Thêm trạng thái hiển thị mật khẩu cho trường nhập lại mật khẩu
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let passwordMatch = true; // Biến để kiểm tra tính khớp của mật khẩu
    
        if (password !== rePassword) {
            toast.error("Password and RePassword do not match");
            passwordMatch = false;
        }
    
        if (passwordMatch) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API}/api/register`, {
                    name,
                    email,
                    password,
                    phone,
                    address,
                    answer,
                });
                if (res && res.data.success) {
                    toast.success(res.data && res.data.message);
                    navigate("/login");
                } else {
                    toast.error(res.data.message);
                }
            } catch (e) {
                console.log(e);
                toast.error("Something went wrong");
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };

    const handleBackToLogin = () => {
        navigate('/login');
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     try{
    //         const res = await axios.post(`${process.env.REACT_APP_API}/api/register`,
    //             { name, email, password, phone, address, answer }
    //         );
    //         if(res && res.data.success){
    //             toast.success(res.data && res.data.message);
    //             navigate("/login");
    //         }else{
    //             toast.error(res.data.message);
    //         }
    //     }catch(e){
    //         console.log(e);
    //         toast.error("Something went wrong");
    //     }
    // }
    // console.log(process.env.REACT_APP_API);

  return (
    <Layout title={"Register - Ecommer App"}>
        <div className="form-container" style={{ minHeight: "90vh" }}>
            <form onSubmit={handleSubmit} className='register-form'>
                <h4>Register Form</h4>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Name</label>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your name'
                    // required
                    autoFocus
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Email</label>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your Email'
                    // required
                    />
                </div>
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
                            {showPassword ? (
                                <FaEyeSlash onClick={toggleShowPassword} className="eye-icon" />
                            ) : (
                                <FaEye onClick={toggleShowPassword} className="eye-icon"/>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1">RePassword</label>
                        <div className="password-input">
                            <input
                                type={showRePassword ? "text" : "password"}
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                className="form-control"
                                id="exampleInputPassword2"
                                placeholder="Re-enter your Password"
                                // required
                            />
                            {showRePassword ? (
                                <FaEyeSlash onClick={toggleShowRePassword} className="eye-icon" />
                            ) : (
                                <FaEye onClick={toggleShowRePassword} className="eye-icon" />
                            )}
                        </div>
                    </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1">Phone</label>
                    <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your Phone'
                    // required
                    />
                </div>
                <div>
                    <label htmlFor="exampleInputPassword1">Address</label>
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your Address'
                    // required
                    />
                </div>
                <div>
                    <label htmlFor="exampleInputPassword1">Favorite category</label>
                    <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='What is your favorite sport?'
                    // required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary mt-3 register">
                    Submit
                </button>

                <p style={{ textAlign: "right", marginTop: "10px" }}>
                        <small
                            className="create-account-link"
                            onClick={handleBackToLogin}
                            style={{
                            color: "blue", // Màu xanh
                            textDecoration: "underline", // Gạch chân
                            cursor: "pointer", // Đổi hình con trỏ khi rê chuột vào
                            }}
                        >
                            Already have account, Back to login
                        </small>
                    </p>
            </form>
        </div>
    </Layout>
  )
}

export default Register