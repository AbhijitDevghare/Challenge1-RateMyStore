// utils/generateOtp.js

const generateOtp = (length = 6) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generates a digit between 0 and 9
  }
  return otp;
};

export default generateOtp;
