const jwt = require('jsonwebtoken');

module.exports = app => {

    app.use('/api/**',function(req, res, next) {

        var token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            
            jwt.verify(token, 'oroshi', function(err, decoded) {
              if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
              
              req.dataReq = decoded;
              next();
            });
    });
}