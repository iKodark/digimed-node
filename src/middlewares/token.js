const jwt = require('jsonwebtoken');

module.exports = app => {

    app.use('/api/**',function(req, res, next) {
        // var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // if(token) {
        //     jwt.verify(token, 'oroshi', function(err, decoded) {      
        //         if (err) {
        //             return res.json({ success: false, message: 'Invalid Token' });    
        //         } else {
        //         req.decoded = decoded;    
        //         next();
        //         }
        //     });
        // } else {

        //     return res.status(403).send({
        //         success: false,
        //         message: 'Forbidden!' 
        //     }); 
        // }
        next();
    });
}