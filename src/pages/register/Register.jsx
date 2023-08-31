import { NavLink, useNavigate } from 'react-router-dom';
import './Register.scss';
import { useState } from 'react';

import axios from 'axios';

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    })
    const [err, setErr] = useState(null);
    const navigate = useNavigate();


    const handelChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
            setErr(null);
            navigate("/login");
        } catch (err) {
            setErr(err.response.data);
        }
        setInputs({
            username: "",
            email: "",
            password: "",
            name: ""
        })
    }
    return (
        <>
            <div className="register">
                <div className="card">
                    <div className="right">
                        <h1>Register</h1>
                        <form onSubmit={handelSubmit}>
                            <input type="text" placeholder='Username' name='username' value={inputs.username} onChange={handelChange} />
                            <input type="email" placeholder='E-mail' name='email' value={inputs.email} onChange={handelChange} />
                            <input type="password" placeholder='Password' autoComplete='current-password' name='password' value={inputs.password} onChange={handelChange} />
                            <input type="text" placeholder='Name' name='name' value={inputs.name} onChange={handelChange} />
                            {err && err}
                            <button type='submit'>Register</button>
                        </form>
                    </div>
                    <div className="left">
                        <h1>I Am Social.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus pariatur ex quod consequatur fugiat laboriosam debitis nisi quasi excepturi?</p>
                        <span>Do You have an account?</span>
                        <NavLink to="/login"><button>Login</button></NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
