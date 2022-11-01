const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {

    // Collection the token in three ways
    const token = req.cookies.token || req.body.token || req.header('Authorization').split(' ')[1] 
    console.log(token)
    if (!token) {
        return res.status(403).send('Token is missing');
    }


    // Varify the token
    try {
        const decoded = jwt.verify( token, process.env.SERECT_KEY );
        req.user = decoded;
        console.log(decoded);
    } catch (error) {
        return res.status(401).json({massage :"Invalide token", "error Msg" : error})
    }



    return next();
}

module.exports = auth;