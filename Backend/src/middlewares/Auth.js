import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { Admin ,StoreOwner,User} from '../models/index.js';
import AppError from '../utils/error.utils.js';

class Auth {
    // Middleware to verify JWT token
    jwtAuth(req, res, next) {
        const token = req.cookies?.token;

        if (!token) {
            return next(new AppError("Not Authorized: No token provided", 401));
        }

        try {
            const payload = jwt.verify(token, process.env.SECRET);
            req.user = { id: payload.id, email: payload.email };
            next();
        } catch (error) {
            return next(new AppError(`Not Authorized: ${error.message}`, 401));
        }
    }

     setRole(role) {
        return (req, res, next) => {
        req.body.role = role;
        next();
        };
    }


    async isAdminCheck(req, res, next) {
        try {
            const userId = req.user?.id;

            if (!userId || isNaN(Number(userId))) {
                return next(new AppError("Invalid user ID", 400));
            }

            const admin = await Admin.findOne({ where: { userId } });

            if (!admin ) {
                return next(new AppError("Not Authorized: Admin access required", 403));
            }

            next();
        } catch (err) {
            return next(new AppError(`Admin check failed: ${err.message}`, 400));
        }
    }

    async isStoreOwner(req, res, next) {
        try {
            const userId = req.user?.id;

            if (!userId || isNaN(Number(userId))) {
                return next(new AppError("Invalid user ID", 400));
            }

            
            const owner = await StoreOwner.findOne({ where: { userId } });

            if (!owner ) {
                return next(new AppError("Not Authorized: Store Manager access required", 403));
            }

            next();
        } catch (err) {
            return next(new AppError(`Role check failed: ${err.message}`, 400));
        }
    }
}

const auth = new Auth();
export default auth;
