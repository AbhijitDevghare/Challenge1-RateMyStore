import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/slices/AuthSlice";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgetPassword(email));
    };

    return (
        <div className="flex items-center justify-center  bg-white">
            <div className="w-full max-w-md p-6 bg-white ">
                <h2 className="text-2xl font-bold text-center text-black mb-6">
                    Forgot Your Password?
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-black font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Send Reset Link
                    </button>
                </form>
                <p className="text-sm text-center text-black mt-4">
                    We will send you an email with instructions to reset your password.
                </p>

                <p className="text-sm text-center text-black mt-4">Or</p>

                <Link to={"/auth/sendOtp"}>
                    <p className="text-sm text-center mt-4 underline text-blue-700">
                        Send OTP
                    </p> 
                </Link>
                
                <Link to={"/auth/login"}>
                    <p className="text-sm text-center mt-4 underline text-blue-700">
                        Log in
                    </p> 
                </Link>
            </div>
        </div>
    );
};

export default ForgetPassword;
