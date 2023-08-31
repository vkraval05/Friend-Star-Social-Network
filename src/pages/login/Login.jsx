import { NavLink, useNavigate } from 'react-router-dom'
import './Login.scss'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';


const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const [err, setErr] = useState(null);

    const handelChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);
            navigate('/');
        } catch (error) {
            setErr(error.response.data);
        }
    }

    return (
        <>
            <div className="login">
                <div className="card">
                    <div className="left">
                        <h1>Hello World.</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus pariatur ex quod consequatur fugiat laboriosam debitis nisi quasi excepturi?</p>
                        <span>Don't You have an account?</span>
                        <NavLink to="/register"><button>Register</button></NavLink>
                    </div>
                    <div className="right">
                        <h1>Login</h1>
                        <form onSubmit={handleLogin}>
                            <input type="text" placeholder='Username' name='username' onChange={handelChange} value={inputs.username} />
                            <input type="password" placeholder='Password' name='password' onChange={handelChange} value={inputs.password} />
                            <span>{err && err}</span>
                            <button type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
