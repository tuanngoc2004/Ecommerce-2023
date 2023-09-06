import React, {useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/register`,
                { name, email, password, phone, address, answer }
            );
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        }catch(e){
            console.log(e);
            toast.error("Something went wrong");
        }
    }
    // console.log(process.env.REACT_APP_API);

  return (
    <Layout title={"Register - Ecommer App"}>
        <div className="form-container" style={{ minHeight: "90vh" }}>
            <form onSubmit={handleSubmit}>
                <h4>Register Form</h4>
                <div className="mb-3">
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your name'
                    required
                    autoFocus
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your Email'
                    required
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
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your Phone'
                    required
                    />
                </div>
                <div>
                    <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Enter your Address'
                    required
                    />
                </div>
                <div>
                    <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='What is your favorite sport?'
                    required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    </Layout>
  )
}

export default Register