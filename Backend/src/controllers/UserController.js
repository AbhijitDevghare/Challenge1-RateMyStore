// import {userService} from "../services/index"

// class UserController {
//    async register(req, res, next) {
//     try {
//       const {user,token,cookieOptions} = await userService.registerUser(req.body, req.file);

//       res.cookie("token", token, cookieOptions);

//       res.status(200).json({ success: true, message: "User created successfully...", user });
//     } catch (err) {

//       if (err.code === 11000) {
//         return next(new AppError("User already Exists", 400));
//       }
      
//       next(err);
//     }
//   }

//   // Login Controller
//    async login(req, res, next) {
//     try {
//       const {user,token,cookieOptions} = await userService.loginUser(req.body.identifier, req.body.password);

//       res.cookie("token", token, cookieOptions);
//       res.status(200).json({ success: true, message: "Login Successful", user });
//     } catch (err) {
//       next(err);
//     }
//   }

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

//   // Get User Controller
//    async getuser(req, res, next) {
//     try {
//       const userId = req.user.id;
//       const user = await userService.getUserById(userId);
//       res.status(200).json({ success: true, data: user });
//     } catch (err) {
//       next(err);
//     }
//   }

//   // Update User Profile Controller
//    async updateUserProfile(req, res, next) {
//     try {
//       console.log("Request for updating profile")
//       const user = await userService.updateUserProfile(req.user.id, req.body, req.file);
//       res.status(200).json({ success: true, message: "User profile updated successfully", user });
//     } catch (err) {
//       next(err);
//     }
//   }

//   // Update User Avatar Controller
//    async updateAvatar(req, res, next) {
//     try {
//       const user = await userService.updateAvatar(req.user.id, req.file);
//       res.status(200).json({ success: true, message: "Avatar updated successfully", avatar: user.avatar });
//     } catch (err) {
//       next(err);
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
// }

// export default new UserController();