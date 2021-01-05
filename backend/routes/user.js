const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res)=>{   //get all the users from the mongodb atlas
    User.find()   //find all users mongoose mthod it returns a promise
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Erorr: ' + err));
});

// router.route('/:age').get((req, res)=>{
//     User.find({age: req.params.age})
//       .then(users => res.json(users))
//       .catch(err => res.status(400).json('Error: ' + err));
// })


router.post("/add" , async (req, res)=>{   //POST Request and body has all the components async bcz data is saved to mongo
    const name = req.body.name;
    const email = req.body.email;
    const bloodGroup = req.body.bloodGroup;
    const age = req.body.age;
    const bloodBank = req.body.bloodBank;
    const contact = req.body.contact;
    const address = req.body.address;
    const status = req.body.status;
    const type = req.body.type;

    //validation
    if(!name || !email || !contact || !address || !type){
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }

    if(name.length < 3 ){
      return res.status(400).json({ msg: "The name needs to be at least 3 characters long." });
    }

    const existingUserEmail= await User.findOne({ email: email });  //check whether user with the same email existed or not as email should be unique
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
})

router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/:id').delete((req, res)=>{
    User.findByIdAndDelete(req.params.id)
      .then(res.json('User deleted'))
      .catch(err => res.status(400).json('Error: ' + err));
})
 
router.route('/update/:id').post((req, res)=>{
    User.findById(req.params.id)
      .then(users => {
        users.name = req.body.name;
        users.email = req.body.email;
        users.bloodGroup = req.body.bloodGroup;
        users.age = req.body.age;
        users.bloodBank = req.body.bloodBank;
        users.contact = req.body.contact;
        users.address = req.body.address;
        users.status = req.body.status;
        users.type = req.body.type;

        users.save()  //save new user to database
        .then(() => res.json('user Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});
 
  
module.exports = router;

