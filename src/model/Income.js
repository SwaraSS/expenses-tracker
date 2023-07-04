const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");

const incomeSchema = mongoose.Schema({
    title:{
        required: [true, "Title is Required"],
        type: String,
    },
    description:{
        required: [true, "Description is Required"],
        type: String,
    },
    type:{
        type: String,
        default: "income",
    },
    amount:{
        required: [true, "Amount is Required"],
        type: Number,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is Required"],
    },
},{
    timestamp: true,
    toJson:{
        virtuals: true,
    },
    toObject:{
        virtuals: true,
    },
});

//pagination
incomeSchema.plugin(mongoosePaginate);

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;