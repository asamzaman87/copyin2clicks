import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stripeSubscriptionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  currentPeriodEnd: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Subscription || mongoose.model('Subscription', SubscriptionSchema);
