function checkforAuthenticationCookie(cookieName) {
    return function (req, res, next) {
        const cookie = req.cookies[cookieName];
        if (!cookie) {
            return res.status(401).json({ message: 'Authentication cookie not found' });
        }
        next();

      try {
        const userpayload = validateToken(tokenCookieValue);
        req.userpayload;
        next();
      }
      catch(error){
        next();
      };
    };
    // here we dinde the routes for the user , login , logout 