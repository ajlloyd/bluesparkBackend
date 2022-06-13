const shortId = require('shortid');
const Profile = require('../models/profile');



exports.MyProfile = (req, res) => {

    Profile.findOne({email:req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: "Email is already in use"
            })
        };

        const {firstname, lastname, email, uid} = req.body;
        //let fireBaseUID = admin.auth().getUserByEmail(email);
        //console.log(fireBaseUID) 
        let username = shortId.generate();
        
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newProfile = new Profile({firstname, lastname, email, uid, username, profile});
        console.log(newProfile)

        newProfile.save ((err, success) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                user: success
            })
        })
    })


};