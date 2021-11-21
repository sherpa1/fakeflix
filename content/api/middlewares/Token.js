const validator = require('validator');
const jwt = require('jsonwebtoken');

const jwt_private_key = process.env.jwt_private_key;

function is_valid(req, res, next) {

    if (req.headers.authorization !== undefined) {

        if (!validator.isEmpty(req.headers.authorization)) {
            //clé authorization du header ex: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            const token = req.headers.authorization.split(' ')[1];//get the Token value

            if (token === undefined) {
                const error = new Error();
                error.status = 401;
                throw error;
            }

            if (validator.isJWT(token)) {


                jwt.verify(token, jwt_private_key, { audience: 'urn:so', issuer: 'so', algorithms: ['RS256'] }, function (err, decoded) {
                    if (err) {

                        if (process.env.NODE_ENV === "development")
                            console.error(err);

                        const error = new Error();
                        error.status = 401;


                        if (err.name === "TokenExpiredError") {
                            /*
                            TokenExpiredError
                            
                            Thrown error if the token is expired.
                            
                            Error object:
                            
                            name: 'TokenExpiredError'
                            message: 'jwt expired'
                            expiredAt: [ExpDate]
                            */
                            error.message = 'token expired';
                            error.status = 409;

                        } else if (err.name === 'JsonWebTokenError') {
                            /*
                            JsonWebTokenError
                            
                            Error object:
                            
                            name: 'JsonWebTokenError'
                            message:
                            'invalid token' - the header or payload could not be parsed
                            'jwt malformed' - the token does not have three components (delimited by a .)
                            'jwt signature is required'
                            'invalid signature'
                            'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
                            'jwt issuer invalid. expected: [OPTIONS ISSUER]'
                            'jwt id invalid. expected: [OPTIONS JWT ID]'
                            'jwt subject invalid. expected: [OPTIONS SUBJECT]'
                            */

                            error.message = err.message;

                            switch (err.message) {

                                case 'invalid token':
                                    break;

                                case 'jwt malformed':
                                    break;

                                case 'jwt signature is required':
                                    break;

                                case "invalid signature":
                                    break;

                                case "jwt audience invalid":
                                    break;

                                case "jwt issuer invalid":
                                    break;

                                case "jwt id invalid":
                                    break;

                                case "jwt subject invalid":
                                    break;


                            }

                        } else if (err.name === "NotBeforeError") {
                            /* 
                            NotBeforeError
                            
                            Thrown if current time is before the nbf claim.
                            
                            Error object:
 
                            name: 'NotBeforeError'
                            message: 'jwt not active'
                            date: 2018-10-04T16:10:44.000Z
                            
                            */

                            error.message = "token is not already valid";
                        }

                        throw error;

                    }
                });

                next();//va au prochain middleware
            } else {
                const error = new Error();
                error.status = 401;
                throw error;
            }

        } else {
            const error = new Error();
            error.status = 401;
            error.message = '';
            throw error;
        }
    } else {
        const error = new Error();
        error.status = 401;
        error.message = '';
        throw error;

    }
}

module.exports.Token = { is_valid };