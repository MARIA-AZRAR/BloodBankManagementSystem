const router = require('express').Router();
let User = require('../models/user.model');
let bloodBag = require('../models/bloodBag.model');
let Donation = require('../models/donation.model');

router.route('/').get((req, res) => {   //get all the users from the mongodb atlas
    User.find()   //find all users mongoose mthod it returns a promise
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Erorr: ' + err));
});

// let banks = [];
// let bloodBanks=[];
// router.route('/blood/:id').get((req, res) => {
//   User.findById(req.params.id)
//     .then(user => res.json({bank:user.name}))
//     .catch(err => res.status(400).json('Error: ' + err));
// })





router.post("/addBloodBag", async (req, res) => {   //POST Request and body has all the components async bcz data is saved to mongo
    try {
        const bloodBank_id = req.body.bloodBank_id;
        const quantity = req.body.quantity;
        const bloodGroup = req.body.bloodGroup;

        //validation
        if (!quantity || !bloodGroup || !bloodBank_id) {
            return res.status(400).json({ msg: "Not all fields have been entered" })
        }
        //calculate expiry date

        const dateNow = new Date()

        let exp_date = new Date();
        //exp_date.setMonth(exp_date.getMonth());


        const newBloodBag = new bloodBag({
            bloodGroup,
            quantity,
            bloodBank_id,
            created_at: dateNow,
            expiry_date:exp_date
        })

        newBloodBag.save()  //save new user to database
            .then(() => res.json('bloodBag added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

//getting expired stock
router.get("/getBags", async (req, res) => {
  const bloodB = await bloodBag.find();
  let bag=[];
  let bags=[];

  for(var i=0;i<bloodB.length;i++)
  { 
     if(bloodB[i].created_at.getTime()===bloodB[i].expiry_date.getTime()){
        bag.push(bloodB[i]);
        bags.push( await bloodBag.findOne({_id:bloodB[i].bloodBank_id})) 
    }   
  }
res.json({
  bag,
      });
  });



module.exports = router;

