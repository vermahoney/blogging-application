const JWT = require('jsonwebtoken');

const secret = "$uperMan@123";

function createTokenForUser(user) {
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
    };
    return JWT.sign(payload, secret);

}
function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}   


module.exports = {
    createTokenForUser,
    validateToken
};      

