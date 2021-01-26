const router = require('express').Router();
let User = require('../models/user.model');
let Donation = require('../models/donation.model');

router.route('/').get((req, res) => {   //get all the users from the mongodb atlas
  User.find()   //find all users mongoose mthod it returns a promise
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Erorr: ' + err));
});
let banks = [];
let bloodBanks=[];
router.route('/blood/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json({bank:user.name}))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {   //get all the users from the mongodb atlas
  Donation.find({donation_id:req.params.id}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      banks=[];
      result.map(function (item) {
         console.log(item.created_at.toLocaleString().split(',')[0]);
          banks.push(item);
      });
     
      //toLocaleString().split(',')[0]
      res.json({banks
       // quantity:banks.quantity,
        //date:banks.created_at
      });
    }
  })
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
/*
router.get("/getBags/:id", async (req, res) => {
  const bank = await User.findById(req.params.id); 
  const donors=await Donation.find();
  let us=[];
  let name=[];
  let donate=[];
  for(var i=0;i<donors.length;i++)
  { 
    us.push(await User.findById(donors[i].donation_id));   
  }
  for(var i=0;i<us.length;i++)
  {
    if(us[i])
    {
      if(us[i].bloodBank==bank.name)
      {
        donate.push(donors[i]);
        name.push(us[i].name);
      }
    }   
  }

res.json({
  donate,
    name
      });
  });*/
module.exports = router;

