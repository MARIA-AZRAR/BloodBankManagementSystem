const router = require('express').Router();
let User = require('../models/user.model');
let bloodBag = require('../models/bloodBag.model');
const { findByIdAndDelete } = require('../models/bloodRequest.model');
const BloodRequest = require('../models/bloodRequest.model');

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
        //exp_date.setMonth(exp_date.getMonth());


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

//send Alerts 
router.get("/Alerts/:id", async (req, res) => {

    let BN = false;
    let BP = false;
    let AN = false;
    let AP = false;
    let ON = false;
    let OP = false;
    let ABN = false;
    let ABP = false;

    try { //get all bags of current bank
        const allBags = await bloodBag.find({ bloodBank_id: req.params.id });

        allBags.map((bag) => {
            if (bag.bloodGroup === 'A+') {
                AP = true;
            }
            if (bag.bloodGroup === 'A-') {
                AN = true;
            }
            if (bag.bloodGroup === 'B-') {
                BN = true;
            }
            if (bag.bloodGroup === 'B+') {
                BP = true;
            }
            if (bag.bloodGroup === 'O-') {
                ON = true;
            }
            if (bag.bloodGroup === 'O+') {
                OP = true;
            }
            if (bag.bloodGroup === 'AB-') {
                ABN = true;
            }
            if (bag.bloodGroup === 'AB+') {
                ABP = true;
            }
        })

        let alerts = [];
        if (AP === false)
            alerts.push('A+')
        if (AN === false)
            alerts.push('A-')
        if (BP === false)
            alerts.push('B+')
        if (BN === false)
            alerts.push('B-')
        if (ABP === false)
            alerts.push('AB+')
        if (ABN === false)
            alerts.push('AB-')
        if (ON === false)
            alerts.push('O-')
        if (OP === false)
            alerts.push('O+')
      res.json(alerts)
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }


})



//make donation
router.post("/CompleteDonation/:id", async (req, res) => {

    try { //get all bags of current bank
        const allBags = await bloodBag.find({ bloodBank_id: req.params.id });
        //console.log(allBags)
        let len = allBags.length;
        let flag = true;
        let quantity = req.body.quantity;

        while (flag) {
            for (let i = 0; i < len; i++) {
                let bag = allBags[i];
                if (bag.bloodGroup === req.body.bloodGroup) {  //and not expired
                    //if quantity greater
                    if (bag.quantity >= quantity) {
                        let q = bag.quantity - quantity;
                        if (q === 0) {
                            console.log("Z E R O")
                            //delete bag
                            await bloodBag.findByIdAndDelete(bag._id, null, (err, docs) => {
                                if (err)
                                    res.status(500).json(err);
                                else
                                    console.log("Original Doc : ", docs);
                            });
                        } else {
                            console.log("NOT")
                            //update bag
                            await bloodBag.findByIdAndUpdate({ _id: bag._id }, { quantity: q }, null, (err, docs) => {
                                if (err)
                                    res.status(500).json(err);
                                else
                                    console.log("Original Doc : ", docs);
                            });
                        }
                        //complete Request 
                        await BloodRequest.findByIdAndUpdate({ _id: req.body.id }, { status: "Complete" }, null, (err, docs) => {
                            if (err)
                                res.status(500).json(err);
                            else
                                console.log("Original Doc : ", docs);
                        });
                        flag = false;
                        res.json("Complete")
                    }
                    else {
                        console.log("INSIDE GREATER QUANTITY")
                        quantity = quantity - bag.quantity;
                        console.log("remaining" + quantity)
                        //delete bag as it has served its perpose
                        await bloodBag.findByIdAndDelete(bag._id, null, (err, docs) => {
                            if (err)
                                res.status(500).json(err);
                            else
                                console.log("Original Doc : ", docs);
                        });
                    }
                }
            }

            flag = false;
        }

        return res.status(400).json({ msg: "Not Enough Stock" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }


})


//getting expired stock
// router.get("/getBags", async (req, res) => {
//   const bloodB = await bloodBag.find();
//   let bag=[];
//   let bags=[];

//   for(var i=0;i<bloodB.length;i++)
//   { 
//      if(bloodB[i].created_at.getTime()===bloodB[i].expiry_date.getTime()){
//         bag.push(bloodB[i]);
//         bags.push( await bloodBag.findOne({_id:bloodB[i].bloodBank_id})) 
//     }   
//   }
// res.json({
//   bag,
//       });
//   });

module.exports = router;

