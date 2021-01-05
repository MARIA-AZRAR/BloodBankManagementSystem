const router = require('express').Router();
const bcrypt = require("bcryptjs");
let Login = require('../models/login.model');
let User = require('../models/user.model');

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
  
      if (password !== confirmPassword){
        return res.status(400).json({ msg: "Enter the same password twice for verification." });
      }

      const existingUserEmail = await User.findOne({ email: email });  //check whether user with the same email existed or not as email should be unique
      if (existingUserEmail)
        user_id = existingUserEmail._id
      else{
          return res.status(400).json({msg: "Registeration coul not be completed. try Again"})
      }
      const existingUsername = await Login.findOne({ username: username });  //check whether user with the same email existed or not as email should be unique
      if (existingUsername)
          return res.status(400).json({msg: "User with this username already exists"})

      //Generate hash for password
      const saltP = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password , saltP);

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
      const { username , password } = req.body;
  
      // Now We'll validate the credentials

      if (!username || !password)
        return res.status(400).json({ msg: "Enter All fields" });
  
      const checkUser = await Login.findOne({ username: username });
      if (!checkUser)
        return res.status(400).json({ msg: "No account with this username has been registered." });
  
      const passwordMatch = await bcrypt.compare(password, checkUser.password);
      if (!isMatch)
         return res.status(400).json({ msg: "Invalid password." });
  
      const token = jwt.sign({ id: checkUser._id , type: checkUser.type }, process.env.JWT_TOKEN_SECRET);  //token can be accssed by secret password
      res.json({
        token,
        user: {
          id: user._id,
          username: checkUser.username,
          type: checkUser.type
        },
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  



module.exports = router;
