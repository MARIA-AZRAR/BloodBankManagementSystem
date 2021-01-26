const router = require('express').Router();

let bloodRequest = require('../models/bloodRequest.model');
let Users = require('../models/user.model');
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
        const due_date = req.body.date;

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



//This should be in user router

router.get("/getAllDonors/:id", async (req, res) => {
    const bank=await Users.findById(req.params.id);
    console.log(bank.bloodBank);
    const donors = await Users.find({ type: "Donor" });
    let donor = [];
    for (var i = 0; i < donors.length; i++) {
        //donors[0].status="Disable";
        if (donors[i].status == "Active" && donors[i].bloodBank==bank.bloodBank) {
            donor.push(donors[i]);
        }
    }
    res.json({
        donor
    });
});


router.get("/getDonorsForBloodBank/:id", async (req, res) => {

    //get name of blood bank from the id provided
    const bloodB = await Users.findById(req.params.id);

    const donors = await Users.find({ type: "Donor", bloodBank: bloodB.name });

    res.json(donors);
});


router.get("/getRecipientsForBloodBank/:id", async (req, res) => {

    //get name of blood bank from the id provided
    const bloodB = await Users.findById(req.params.id);

    const donors = await Users.find({ type: "Recipient", bloodBank: bloodB.name });

    res.json(donors);
});



//get all bloodBanks for admin
router.get("/getAdminBanks", async (req, res) => {
    try{
    const donors = await Users.find({type: "BloodBank"})
    res.json(donors);
    }catch(err){
      return res.status(500).json({error : err.message})
    }
  });
  
  
  //get all users for admin
router.get("/getAdminDonor", async (req, res) => {
    try{
    const donors = await Users.find({type :"Donor"})
    res.json(donors);
    }catch(err){
      return res.status(500).json({error : err.message})
    }
  });

router.get("/getAdminRecipient", async (req, res) => {
    try{
    const recipients = await Users.find({type : "Recipient"})
    res.json(recipients);
    }catch(err){
      return res.status(500).json({error : err.message})
    }
  });
  
  



router.get("/getAllRec/:id", async (req, res) => {
    const bank=await Users.findById(req.params.id);
    console.log(bank.bloodBank);
    const userDetails = await bloodRequest.find(); 
    let donorRequests=[];
    for (var i = 0; i < userDetails.length; i++) {
        if (userDetails[i].status == "Active" ) {
           const user=await Users.findOne({ _id: userDetails[i].recipient_id })
           if(user.bloodBank==bank.bloodBank)
            {donorRequests.push({
                name:user.name,
                bloodGroup:userDetails[i].bloodGroup,
                dueDate:userDetails[i].due_date,
                contact:user.contact,
                quantity:userDetails[i].quantity
            })}
        } 
    }
    
    res.json(donorRequests );
});



router.get("/viewRequests/:id", async (req, res) => {
    const userDetails = await bloodRequest.find({ recipient_id: req.params.id }); //getting user
    //const userLogin = await Login.findById(req.id); //getting userLogin
    let status = [];
    for (var i = 0; i < userDetails.length; i++) {
        if (userDetails[i].status == "Active") {
            status.push("Pending");
        }
        else {
            status.push("Complete");
        }
    }
    let recipient = [];
    recipient.push(await Users.findOne({ _id: userDetails[0].recipient_id }))
    res.json({
        userDetails,
        recipient,
        status
    });
});



//maria code 
router.get("/getAllRequests/:id", async (req, res) => {

    //going to get the blood requests of a bank with recipient name and age
    try {

        const allRequests = await bloodRequest.find({});
        console.log(allRequests)
        let bloodRequests = [];
        let len = allRequests.length;
        let i = 0;

        if(len === 0){
            res.json([]);
        }
        const bankName = await Users.findById(req.params.id);  //to get name of bloodbank by id as user table has its name

        const getData = async (item) => {
            let recipientInfo = "";
            recipientInfo = await Users.findOne({ _id: item.recipient_id })
            if (recipientInfo.bloodBank === bankName.name) {
                bloodRequests.push({
                    _id: item._id,
                    bloodGroup: item.bloodGroup,
                    quantity: item.quantity,
                    address: item.address,
                    recipient_id: item.recipient_id,
                    due_date: item.due_date,
                    status: item.status,
                    recipient_name: recipientInfo.name,
                    age: recipientInfo.age,
                    contact: recipientInfo.contact
                })
            }
            ++i;
            if (i === len) {
                res.json(bloodRequests);
            }
        }

        allRequests.map(getData)

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get("/getAdminRequest", async (req, res) => {
    const requests = await bloodRequest.find(); 
    let adminRequests=[];
    for(var i=0;i<requests.length;i++)
    {
     const userReq=await Users.findById(requests[i].recipient_id);
     if(requests[i].status=="Active")
     {
        adminRequests.push({
            "name":userReq.name,
            "bloodGroup":requests[i].bloodGroup,
            "dateDonated":requests[i].due_date,
            "quantity":requests[i].quantity,
            "address":requests[i].address,
            "bloodBank":userReq.bloodBank,
            "status":"Pending",
            "id":requests[i]._id
   
        })
     }
     else{
        adminRequests.push({
            "name":userReq.name,
            "bloodGroup":requests[i].bloodGroup,
            "dateDonated":requests[i].due_date,
            "quantity":requests[i].quantity,
            "address":requests[i].address,
            "bloodBank":userReq.bloodBank,
            "status":requests[i].status,
            "id":requests[i]._id
   
        })

     }
   
    }
        res.json(adminRequests);
          });


 router.get("/deleteRequest/:id", async (req, res) => {
    const deleteReq = await bloodRequest.findByIdAndDelete(req.params.id);
    res.json(deleteReq);
    });

module.exports = router;

