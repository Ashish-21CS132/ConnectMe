const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {

    // console.log( process.env.Access_Token_Private_Key);
    // console.log(req.headers.authorization);
    if (
        !req.headers ||
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
    ) {
        // return res.status(401).send("Authorization header is required");
        return res.send('Authorization header is required')
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    // console.log(accessToken);

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.Access_Token_Private_Key
        );
        
        
       
       req._id=decoded._id;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).send("Invalid access key");
       
    }
};