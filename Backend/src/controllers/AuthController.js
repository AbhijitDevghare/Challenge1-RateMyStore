import {authService} from "../services/index.js";
import AppError from "../utils/error.utils.js";

class AuthController {
  async register(req, res, next) {
    try {

      const result = await authService.register(req.body);

      res.status(201).json({
        success: true,
        message: `${req.body.role} registered successfully`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }



  
  //   // Login Controller
     async login(req, res, next) {
      try {
        if(!req.body.identifier || !req.body.password)
        {
             throw new AppError("Both identifier and password are required", 400);
        }
        const {safeUser,token,cookieOptions} = await authService.login(req.body);

        res.cookie("token", token, cookieOptions);
        res.status(200).json({ success: true, message: "Login Successful", user:safeUser });
      } catch (err) {
        next(err);
      }
    }

  //   // Logout Controller
  //    async logout(req, res, next) {
  //     try {
  //       const cookieOptions = {
  //         expires: new Date(),
  //         httpOnly: true
  //       };

  //       res.cookie("token", null, cookieOptions);
  //       res.status(200).json({
  //         success: true,
  //         message: "Logged out successfully..."
  //       });
  //     } catch (error) {
  //       next(error);
  //     }
  //   }


  //   // Forget Password Controller
//    async forgetPassword(req, res, next) {
//     try {
//       await userService.forgetPassword(req.body.email,req);
//       res.status(200).json({ success: true , message :"Reset link is set to the email .Check your email ." });
//     } catch (err) {
//       next(err);
//     }
//   }

//   // Reset Password Controller
//    async resetPassword(req, res, next) {
//     try {
//       const message = await userService.resetPassword(req.params.resetToken, req.body.password);
//       res.status(200).json({ success: true, message });
//     } catch (err) {
//       next(err);
//     }
//   }

//   // Send OTP Controller
//    async sendOtp(req, res, next) {
//     try {
//       const message = await userService.sendOtp(req.body.phoneNumber, req.body.email);
//       res.status(200).json({ success: true, message });
//     } catch (err) {
//       next(err);
//     }
//   }

//   // Verify OTP Controller
//    async verifyOtp(req, res, next) {
//     try {
//       const message = await userService.verifyOtp(req.body.phoneNumber, req.body.email, req.body.otp, req.body.password);
//       res.status(200).json({ success: true, message });
//     } catch (err) {
//       next(err);
//     }
//   }
}

export default new AuthController();
