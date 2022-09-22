const Users = require('../models/Users');
const { verifyTokenAndAuthorization } = require('./verifyToken');

const router = require('express').Router();


router.put('/:id', verifyTokenAndAuthorization, async (req,res) =>{
    if(req.body.password){
        res.body.password = Cryptojs.AES.encrypt(
            JSON.stringify(req.body.password),
            process.env.PASS_SEC
          ).toString();
    }
    try {
        const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});

        res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;