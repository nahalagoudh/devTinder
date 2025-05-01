const express = require('express');
const requestRouter = express.Router();
const connectionRequest = require('../models/connectionRequest')
const { auth } = require("../middleware/auth");
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", auth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "invalid satus type" + status })
        }
        const isUserExists = await User.findById({ _id: toUserId })
        if (!isUserExists) {
            return res.status(400).json({ message: "User not found" })
        }


        const isConnectionRequestAlreadyExist = await connectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });


        // console.log("isConnectionRequestAlreadyExist---->", isConnectionRequestAlreadyExist)

        if (isConnectionRequestAlreadyExist) {
            return res.status(400).json({
                message: "Connection request already exist"
            })
        } else {

        }
        const connectionRequests = new connectionRequest({
            fromUserId: fromUserId,
            toUserId: toUserId,
            status: status
        })
        console.log("connectionRequests", connectionRequests)


        const data = await connectionRequests.save()

        res.json({
            message: `${req.user.firstName} has send request to `,
            data: data
        })


    } catch (error) {
        res.status(400).send(error.message);
        // res.status(400).send("ERROR", error.message)`
    }

})

module.exports = requestRouter;