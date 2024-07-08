// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

export default function page() {
//   const router = useRouter();
//   const [subscription, setSubscription] = useState(null);
//   const [isLoading, setisLoading] = useState(false);
//   const [session, setSession] = useState(null);

//   const { session_id } = router.query;
//   console.log(session_id, "sssss");

//   useEffect(() => {
//     const fetchSession = async () => {
//       if (session_id) {
//         const response = await fetch(
//           `/api/subscription-details?session_id=${session_id}`
//         );
//         const data = await response.json();
//         setSession(data);
//       }
//     };

//     fetchSession();
//   }, [session_id, router]);

//   if (!session_id) {
//     return <div>Loading...</div>;
//   }

  return (
    <>
    </>
    // <div>
    //    <div>
    //     <h1>Success</h1>
    //     {session ? (
    //       <div>
    //         <p>Thank you for your purchase!</p>
    //         {/* <p>Subscription ID: {session.id}</p> */}
    //       </div>
    //     ) : (
    //       <p>Loading...</p>
    //     )}
    //   </div> 
    // </div>
  );
}
