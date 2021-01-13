const router = require('express').Router();

let Donation = require('../models/donation.model');

router.route('/').get((req, res) => {   //get all the users from the mongodb atlas
  User.find()   //find all users mongoose mthod it returns a promise
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Erorr: ' + err));
});


router.post("/addDonation", async (req, res) => {   //POST Request and body has all the components async bcz data is saved to mongo
  try {
    const donation_id = req.body.user_id;
    const quantity = req.body.quantity;
    const bloodGroup = req.body.bloodGroup;

    //validation
    if(!quantity || !bloodGroup || !donation_id){
        return res.status(400).json({msg: "Not all fields have been entered"})
    }

    const newDonation = new Donation({
     bloodGroup,
     quantity,
     donation_id
    })

    newDonation.save()  //save new user to database
      .then(() => res.json('donation added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

