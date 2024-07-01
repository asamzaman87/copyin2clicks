'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Success() {
    const router = useRouter();
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const { session_id } = router.query;
        if (session_id) {
            axios.get(`/api/subscription?session_id=${session_id}`)
                .then((res) => setSubscription(res.data))
                .catch((error) => console.error(error));
        }
    }, [router.query]);

    if (!subscription) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Payment Successful</h1>
            <p>Thank you for your purchase!</p>
            <p>Your subscription details:</p>
            <ul>
                {/* <li>Plan: {subscription.plan.nickname}</li> */}
                {/* <li>Status: {subscription.status}</li> */}
                {/* <li>Next Billing Date: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</li> */}
            </ul>
        </div>
    );
}
