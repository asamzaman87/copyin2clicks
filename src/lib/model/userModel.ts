import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  stripeCustomerId: {
    type: String,
  },
  subscriptionStatus: {
    type: String,
  },
  stripeSubscriptionId: {
    type: String,
  },
  emailVerified: {
    type: Date,
    default: Date.now,
  },
  account: {
    type: [mongoose.Schema.Types.Mixed],
  },
  session: {
    type: [mongoose.Schema.Types.Mixed],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
