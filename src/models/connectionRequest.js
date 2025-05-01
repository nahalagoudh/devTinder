const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        },
        required: true
    }
}, {
    timestamps: true
})

connectionRequestSchema.pre("save", function (next) {

    const connectionRequest = this;
    // const fromId = mongoose.Types.ObjectId(connectionRequest.fromUserId);
    // const toId = mongoose.Types.ObjectId(connectionRequest.toUserId);
    console.log("validatio here")
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("You cannot send a connection request to yourself.")
    }

    next();

});

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

const connectionRequest = mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
)

module.exports = connectionRequest;