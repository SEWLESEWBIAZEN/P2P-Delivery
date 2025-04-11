const mongoose = require("mongoose");
const userType=require('../../enums/UserType')
const Counter=require ('../common/counter')

const usersSchema = new mongoose.Schema(
  {
    userId: { type: Number, unique: true},
    userName: {
      type: String,
      required: [true, "User Name is required!"],
    },
    userType:{
      type:String,
      enum:Object.values(userType),
      default:userType.SENDER
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Password is required!"],
    },
    phoneNumber:{
      type:String,
      required:[true, "Phone Number is Required"]
    },
    verified:{
      type:Boolean,
      default:false
    },
   rating: {
      type: Number,
      required: false,
      default: 0,
    },
    createdAt:{
      type:Date,
      required:false,
    },
    totalDeliveries:{
      type:Number,
      required:false,
      default:0
    },
    successfullDeliveries:{
      type:Number,
      required:false,
      default:0
    }
  },
  {
    timestamps: true,
  }
);
 
//generate user id based on our requirement
usersSchema.pre('save', async function(next) {
  if (!this.isNew || this.userId) return next();
  
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'userId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.userId = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

const usersModel = mongoose.model("users", usersSchema);
module.exports = usersModel;
