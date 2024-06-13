import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/model/userModel';
import { buffer } from 'micro';


const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export async function POST(request: NextRequest) {
    const buf = await buffer(request as any);
    const sig = request.headers.get('stripe-signature');
    if (!sig) {
        console.log(`⚠️  Webhook signature is null.`);
        return new NextResponse(`Webhook Error: Signature is null.`, { status: 400 });
    }
    
    let event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, stripeWebhookSecret as string);
    } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    await dbConnect();

    let subscription;
    let status;

    switch (event.type) {
        case 'customer.subscription.trial_will_end':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            break;
        case 'customer.subscription.deleted':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            await User.findOneAndUpdate(
                { stripeCustomerId: subscription.customer },
                { subscriptionStatus: status }
            );
            break;
        case 'customer.subscription.created':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            await User.findOneAndUpdate(
                { stripeCustomerId: subscription.customer },
                { subscriptionStatus: status, stripeSubscriptionId: subscription.id }
            );
            break;
        case 'customer.subscription.updated':
            subscription = event.data.object;
            status = subscription.status;
            console.log(`Subscription status is ${status}.`);
            await User.findOneAndUpdate(
                { stripeCustomerId: subscription.customer },
                { subscriptionStatus: status }
            );
            break;
        case 'entitlements.active_entitlement_summary.updated':
            subscription = event.data.object;
            console.log(`Active entitlement summary updated for ${subscription}.`);
            break;
        default:
            console.log(`Unhandled event type ${event.type}.`);
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
