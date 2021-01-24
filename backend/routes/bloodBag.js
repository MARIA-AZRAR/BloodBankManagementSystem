const router = require('express').Router();

let bloodBag = require('../models/bloodBag.model');

router.route('/').get((req, res) => {   //get all the users from the mongodb atlas
    User.find()   //find all users mongoose mthod it returns a promise
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Erorr: ' + err));
});


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
        exp_date.setMonth(exp_date.getMonth() + 2);


        const newBloodBag = new bloodBag({
            bloodGroup,
            quantity,
            bloodBank_id,
            created_at: dateNow,
            expiry_date: exp_date
        })

        newBloodBag.save()  //save new user to database
            .then(() => res.json('bloodBag added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


//***************************************Maria's Code****************************

router.post("/CompleteDonation", async (req, res) => {

    const allBags = await bloodRequest.find({});
    let len = allBags.length;

    let flag = true;
    while (flag) {
        for (let i = 0; i < len; i++) {
        

        }
    }


})

module.exports = router;

