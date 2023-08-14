import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import qlub_logo from '../assets/qlub_logo.png'
import { useAuth } from "../context/AuthProvider";
import { MdPersonOutline, MdLockOpen } from 'react-icons/md'; // Importing icons

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shake, setShake] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const Navigate =useNavigate();
    const { login } = useAuth();


    const handleLogin = async () => {
        const response = await login(email, password);
        if (response.error) {
            console.log(response.error)
            setShake(true);
            setShowToast(true);
            setTimeout(() => {
                setShake(false);
                setShowToast(false);
                }, 2000); 
        } else if (response.data.user && response.data.session) {
            Navigate('/home')
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <img src={qlub_logo} alt="Logo" className="logo"/>
                <div className="text-container">
                    <p>Card Linker Login</p> {/* Replace with your text */}
                </div>
                <div className={`input-field ${shake ? 'shake' : ''}`}>
                    <MdPersonOutline />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className={`input-field ${shake ? 'shake' : ''}`}>
                    <MdLockOpen />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <button className={`login-button ${shake ? 'shake' : ''}`} onClick={handleLogin} >Login</button>
                <div className={`toast ${showToast ? 'show' : ''}`}>Invalid credentials!</div>
            </div>
        </div>
        );
};

export default LoginPage;