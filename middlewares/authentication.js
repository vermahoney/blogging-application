const 

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const payload = validateToken(token);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
}

module.exports = { authenticateToken };