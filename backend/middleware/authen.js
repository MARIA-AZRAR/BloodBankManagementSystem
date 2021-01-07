const jwt = require("jsonwebtoken")

const authen = (req, res, next) => {  //next define what to do next
    try {

        const token = req.header("auth-token"); //header will be returned from the frontEnd & have token 
        if (!token) {
            return res.status(401).json({ msg: "No authentication token is present , access denied" })
        }

        //as json toekn is encrypted we're gonna decrypt it
        const decrypt = jwt.verify(token, process.env.JWT_TOKEN_SECRET) //JWT_TOKEN is a secret password we created

        if (!decrypt) {
            return res.status(401).json({ msg: "Token not verified , access denied" })
        }
        
        //Returning decrypted values to the del so that we can delete the user 
        req.id = decrypt.id;   //ID of login document
        req.user_id = decrypt.user_id; //ID of user document to update the status to disabled after deleting
        req.type = decrypt.type;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

module.exports = authen;