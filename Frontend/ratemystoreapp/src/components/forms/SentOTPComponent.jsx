import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp } from "../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const OtpAuthentication = () => {
    const [phoneNumber, setPhoneNumber] = useState("+91");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;

        // Ensure the phone number starts with +91
        if (input.startsWith("+91")) {
            setPhoneNumber(input);
        } else {
            setPhoneNumber("+91" + input.replace(/^\+91/, ""));
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const response = await dispatch(sendOtp({ phoneNumber, email }));
        if (response?.payload?.success) setOtpSent(true);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const res = await dispatch(verifyOtp({ phoneNumber, otp, email, password }));
        if (res.payload.success) {
            navigate("/auth/login");
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="w-full max-w-md p-8 bg-white ">
                {!otpSent ? (
                    <>
                        <h2 className="text-2xl font-bold text-center text-black mb-6">Send OTP</h2>
                        <form onSubmit={handleSendOtp}>
                            <div className="mb-4">
                                <label htmlFor="phoneNumber" className="block text-black font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    placeholder="Enter your phone number"
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-black font-medium">
                                    Email Address (Optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email (optional)"
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                Send OTP
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-center text-black mb-6">
                            Verify OTP & Reset Password
                        </h2>
                        <form onSubmit={handleVerifyOtp}>
                            <div className="mb-4">
                                <label htmlFor="otp" className="block text-black font-medium">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter the OTP"
                                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
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
                                Verify OTP & Reset Password
                            </button>
                        </form>
                        <button
                            onClick={handleSendOtp}
                            className="w-full mt-4 py-3 bg-yellow-600 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-700 transition duration-300"
                        >
                            Resend OTP
                        </button>
                    </>
                )}

                <Link to={"/auth/forgotPassword"}>
                    <p className="text-sm text-center mt-4 underline text-blue-700">Send reset link</p>
                </Link>

                <p
                    className="text-sm text-center mt-4 underline text-blue-700 cursor-pointer"
                    onClick={() => setOtpSent(false)}
                >
                    Get OTP on another number
                </p>
            </div>
        </div>
    );
};

export default OtpAuthentication;
