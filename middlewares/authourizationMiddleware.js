const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const envUtils = require('../common/envUtils');



// Middleware to verify token and extract user info
const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), envUtils.get('JWT_SECRET'));
        const user = await User.findById(decoded.id);

        if (!user || user.is_deleted) {
            return res.status(401).json({ message: 'User not found or deactivated.' });
        }

        req.user = user; // Attach user object to request

        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};


// Middleware to restrict access based on roles
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user.role){
            return res.status(403).json({ message: 'Forbidden. You do not have any role.' });            
        }
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden. You do not have permission to access this resource.' });
        }
        next();
    };
};

const validateRoles = (req, res, next) => {
    const role = req.body.role || "student"; // Default role to 'student'
    
    const validRoles = ["admin", "staff", "student"];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    req.userRole = role; // Store role in request for further use
    next();
};


module.exports = { authenticateUser, authorizeRoles, validateRoles };