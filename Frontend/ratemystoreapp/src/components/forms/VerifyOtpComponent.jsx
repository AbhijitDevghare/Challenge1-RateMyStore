import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../redux/slices/AuthSlice";
import toast from "react-hot-toast";

const VerifyOtp = () => {
    const [phoneNumber, setPhoneNumber] = useState("+91");
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyOtp({ phoneNumber, otp }))
            .unwrap()
            .then(() => {
                toast.success("OTP verified successfully!");
            })
            .catch((error) => {
                toast.error("Failed to verify OTP: " + error?.message);
            });
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="w-full max-w-md p-8 bg-white">
                <h2 className="text-2xl font-bold text-center text-black mb-6">Verify OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-black font-medium">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="otp" className="block text-black font-medium">
                            OTP
                        </label>
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
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyOtp;
