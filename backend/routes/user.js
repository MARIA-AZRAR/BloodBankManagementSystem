const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {   //get all the users from the mongodb atlas
  User.find()   //find all users mongoose mthod it returns a promise
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Erorr: ' + err));
});

//to get blood banks list for dropdown
router.route('/banksDropDown').get((req, res) => {   //get all the users from the mongodb atlas
  User.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      let banks = []
      result.map(function (item) {
        if (item.type === "BloodBank" && item.status === 'Active')
          banks.push(item.name);
      });
      res.send(banks);
    }
  })
});


router.post("/addUser", async (req, res) => {   //POST Request and body has all the components async bcz data is saved to mongo
  try {
    const name = req.body.name;
    const email = req.body.email;
    const bloodGroup = req.body.bloodGroup;
    const age = req.body.age;
    const bloodBank = req.body.bloodBank;
    const contact = req.body.contact;
    const address = req.body.address;
    const status = req.body.status;
    const type = req.body.type;
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    //validation
    if (!name || !email || !contact || !address || !type || !password || !confirmPassword ||!username) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    if (username.length < 5) {
      return res.status(400).json({ msg: "The username needs to be at least 5 characters long." });
  }

  if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Enter the same password twice for verification." });
  }

    if (name.length < 3) {
      return res.status(400).json({ msg: "The name needs to be at least 3 characters long." });
    }
    const existingUserEmail = await User.findOne({ email: email });  //check whether user with the same email existed or not as email should be unique
    if (existingUserEmail)
      return res.status(400).json({ msg: "An account with this email already exists." });

    const newUser = new User({
      name,
      email,
      bloodGroup,
      age,
      bloodBank,
      contact,
      address,
      status,
      type
    })
    newUser.save()  //save new user to database
      .then(() => res.json('user added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post("/update/:id", async (req, res) => {
  try {
    //validation

    if (!req.body.name || !req.body.email || !req.body.contact || !req.body.address) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    if ((req.body.name).length < 3) {
      return res.status(400).json({ msg: "The name needs to be at least 3 characters long." });
    }

    User.findById(req.params.id)
      .then(users => {
        users.name = req.body.name;
        users.email = req.body.email;
        users.bloodGroup = req.body.bloodGroup;
        users.age = req.body.age;
        users.contact = req.body.contact;
        users.address = req.body.address;
        users.status = req.body.status;

        users.save()  //save new user to database
          .then(() => res.json('user Updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }

});


module.exports = router;