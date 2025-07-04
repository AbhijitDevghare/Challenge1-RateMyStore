import emailValidator from "email-validator";
import AppError from "../utils/error.utils.js";

class ValidateRequestBody {
  checkRequiredFields(data, requiredFields = []) {
    const missing = requiredFields.filter((field) => !data[field]);
    if (missing.length) {
        next( new AppError(`Missing required fields: ${missing.join(", ")}`, 400));
    }
  }

  isEmailValid(email) {
    if (!emailValidator.validate(email)) {
      next(new AppError("Invalid Email Format", 400)) 
    }
  }

  isPasswordEqualToConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) {
      next(new AppError("Passwords do not match", 400)) ;
    }
  }

  checkUserRegistrationDataField = async (req, res, next) => {
    console.log("RADHERADHE")
    console.log(req.body)
    try {
      this.checkRequiredFields(req.body, [
        "username",
        "name",
        "email",
        "password",
        "confirmPassword",
        "address",
        "phoneNumber"
      ]);

      this.isPasswordEqualToConfirmPassword(req.body.password, req.body.confirmPassword);
      this.isEmailValid(req.body.email);
      next();
    } catch (error) {
      next(new AppError(error.message));
    }
  };

  checkStoreOwnerRegistrationDataField = async (req, res, next) => {
    try {
      this.checkRequiredFields(req.body, [
        "username",
        "name",
        "email",
        "password",
        "confirmPassword",
        "address",
        "storeName",
        "gstNumber",
        "phoneNumber"
      ]);

    //   this.isPasswordEqualToConfirmPassword(req.body.password, req.body.confirmPassword);
    //   this.isEmailValid(req.body.email);

      // Optional: GST number format check
    //   const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    //   if (!gstRegex.test(req.body.gstNumber)) {
    //     throw new AppError("Invalid GST number format", 400);
    //   }

      next();
    } catch (error) {
      next(new AppError(error.message));
    }
  };

  checkLoginFields = async (req, res, next) => {
    try {
      this.checkRequiredFields(req.body, ["identifier", "password"]);
      next();
    } catch (error) {
      next(new AppError(error.message));
    }
  };

  checkAddRatingBody(req,res,next)
  {
    try {
        const {rating,storeOwnerId}=req.body
        if(!rating || !storeOwnerId)
        {
            next(new AppError("Rating and Store OwnerId required "))
        }
    } catch (error) {
      next(new AppError(error.message));
    }
  }
  
}

export default new ValidateRequestBody();
