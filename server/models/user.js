import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mobile: {
    type: String,
  },

  city: {
    type: String,
  },

  country: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  profilePhoto: {
    type: String,
    default: "",
  },
  
  wishlist: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tour",
      default: []
    }
  ]
},
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;