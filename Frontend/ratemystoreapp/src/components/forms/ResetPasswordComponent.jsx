import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetPassword } from "../../redux/slices/AuthSlice";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { resetToken } = useParams();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ resetToken, password }));
    };

    return (
        <div className="flex items-center justify-center  bg-white">
            <div className="w-full max-w-md p-8 bg-white shadow-lg">
                <h2 className="text-2xl font-bold text-center text-black mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-black font-medium">
                            New Password
                        </label>
                        <input 
                            type="password" 
                            id="password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="Enter your new password" 
                            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
