import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Company from '../../assets/company.png';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/signup', { email, password });
            alert(response.data); // Use the server's response message
            navigate('/login');
        } catch (error) {
            alert(error.response ? error.response.data : 'Signup failed');
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 bg-gray-100 p-8 flex flex-col justify-center items-center">
                <img src={Company} alt="Logo" className="w-32 h-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">We are The OSAMEDIC Team</h2>
                <p className="text-center mb-4">
                    We are more than just a company. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="flex-1 bg-white p-8 flex flex-col justify-center">
                <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
                {/* Uncomment the form when sign-up is enabled */}
                {/* <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="border border-gray-300 rounded p-2 mb-4 w-full"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="border border-gray-300 rounded p-2 mb-4 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded py-2 hover:bg-blue-600 w-full">
                        Register
                    </button>
                </form> */}
                <p className="text-red-500">Sign-ups are currently disabled. Please contact support for more information.</p>
            </div>
        </div>
    );
}

export default SignupPage;
