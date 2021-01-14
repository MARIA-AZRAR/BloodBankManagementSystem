const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
let Login = require('../models/login.model');
let User = require('../models/user.model');
let authen = require('../middleware/authen')

router.post("/addLogin", async (req, res) => {   //POST Request and body has all the components async bcz data is saved to mongo
    try {
        const username = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const type = req.body.type;
        const email = req.body.email;
        let user_id = req.body.user_id;

        //validation
        if (!username || !password || !type || !confirmPassword || !email) {
            return res.status(400).json({ msg: "Not all fields have been entered." });
        }

        if (username.length < 5) {
            return res.status(400).json({ msg: "The username needs to be at least 5 characters long." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: "Enter the same password twice for verification." });
        }

        const existingUserEmail = await User.findOne({ email: email });  //check whether user with the same email existed or not as email should be unique
        if (existingUserEmail)
            user_id = existingUserEmail._id
        else {
            return res.status(400).json({ msg: "Registeration coul not be completed. try Again" })
        }
        const existingUsername = await Login.findOne({ username: username });  //check whether user with the same email existed or not as email should be unique
        if (existingUsername)
            return res.status(400).json({ msg: "User with this username already exists" })

        //Generate hash for passwordk2
        const saltP = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, saltP);

        const newUserLogin = new Login({
            username,
            password: hashPassword,
            type,
            user_id,
        })
        const savedLogin = await newUserLogin.save();  //save new user to database
        res.json(savedLogin)
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


router.post("/accountLogin", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ msg: "Enter All fields" });

        const checkUser = await Login.findOne({ username: username });
        if (!checkUser)
            return res.status(400).json({ msg: "No account with this username has been registered." });

        const passwordMatch = await bcrypt.compare(password, checkUser.password);
        if (!passwordMatch)
            return res.status(400).json({ msg: "Invalid password." });


        //converting bloodbank name to id so that it can be retuened to front end for donation

        const existingUser = await User.findById(checkUser.user_id);

        let bloodBank = "";
        let dropdownBank = [];
        if (existingUser.bloodBank) {
            bloodBank = await User.findOne({ name: existingUser.bloodBank }) //to find bloodBank id
        }

        const token = jwt.sign({ user_id: checkUser.user_id, id: checkUser._id, type: checkUser.type }, process.env.JWT_TOKEN_SECRET);  //token can be accssed by secret password
        res.json({
            token,
            user: {
                id: checkUser._id,
                username: checkUser.username,
                type: checkUser.type,
                user_id: checkUser.user_id,
                bloodBank_id: bloodBank._id
            },
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/delete", authen, async (req, res) => {
    try {
        //deletin user login info 
        const deletedUserLogin = await Login.findByIdAndDelete(req.id);

        //now we need to set user status to Disabled in the User table
        User.findOneAndUpdate({ _id: req.user_id }, { status: "Disabled" }, null, (err, docs) => {
            if (err)
                res.status(500).json(err);
            else
                console.log("Original Doc : ", docs);
        });

        res.json(deletedUserLogin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//Just to check from frontEnd whether user is logged in or not
router.post("/IsValidToken", async (req, res) => {
    try {
        const token = req.header("auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        if (!verified) return res.json(false);

        const userLogin = await Login.findById(verified.id);
        if (!userLogin) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//To get a single user from front end to check if user is valid
router.get("/", authen, async (req, res) => {
    const userDetails = await User.findById(req.user_id); //getting user
    const userLogin = await Login.findById(req.id); //getting userLogin
    res.json({
        id: userLogin._id,                         //returning info to front end incase if needed
        name: userDetails.name,
        email: userDetails.email,
        status: userDetails.status,
        type: userDetails.type,
        user_id: userDetails._id
    });
});

module.exports = router;
