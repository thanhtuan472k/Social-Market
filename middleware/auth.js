import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/errorResponse';
import User from '../models/User';

// middleware project route when go to home page
exports.auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('Đăng nhập không hợp lệ', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new ErrorResponse('Not Found', 404));
        }
        req.user = user;
        next();
    } catch (err) {
        return next(new ErrorResponse('', 401));
    }
};
