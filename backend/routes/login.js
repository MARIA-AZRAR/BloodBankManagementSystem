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

      const newUserLogin = new Login({
        username,
        password,
        type,
        user_id,
      })
      newUserLogin.save()  //save new user to database
        .then(() => res.json('userLogin added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;
