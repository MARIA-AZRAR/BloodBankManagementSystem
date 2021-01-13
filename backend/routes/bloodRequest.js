const router = require('express').Router();

let bloodRequest = require('../models/bloodRequest.model');

router.route('/').get((req, res) => {   //get all the users from the mongodb atlas
    User.find()   //find all users mongoose mthod it returns a promise
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Erorr: ' + err));
});


router.post("/addBloodRequest", async (req, res) => {   //POST Request and body has all the components async bcz data is saved to mongo
    try {
        const recipient_id = req.body.user_id;
        const quantity = req.body.quantity;
        const bloodGroup = req.body.bloodGroup;
        const address = req.body.address;
        const due_date = req.body.due_date;

        //validation
        if (!quantity || !bloodGroup || !due_date || !address) {
            return res.status(400).json({ msg: "Not all fields have been entered" })
        }

        const newBloodRequest = new bloodRequest({
            bloodGroup,
            quantity,
            recipient_id,
            address,
            due_date
        })

        newBloodRequest.save()  //save new user to database
            .then(() => res.json('bloodRequest added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;

