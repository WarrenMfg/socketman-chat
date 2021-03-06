import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema(
  {
    username: { // username and namespace
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      required: true,
      default: false
    },
    memberOf: [
      {
        type: mongoose.ObjectId,
        ref: 'Room'
      }
    ],
    lastSelectedRoom: {
      type: mongoose.ObjectId,
      ref: 'Room'
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', UserSchema);
export default User;