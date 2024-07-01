import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <div className="w-full max-w-2xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400">
            At CopyIn2Clicks, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our copy-paste extension.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We may collect information about you in a variety of ways. The information we may collect includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Personal Data: Information that you voluntarily provide to us, such as your name and email address.</li>
            <li>Usage Data: Information automatically collected when using the extension, such as the features you use and the time spent on the extension.</li>
            <li>Clipboard Data: Content you copy using the extension, stored locally on your device and not shared with us.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Provide, operate, and maintain our extension.</li>
            <li>Improve, personalize, and expand our extension.</li>
            <li>Understand and analyze how you use our extension.</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service and to provide updates and other information relating to the extension.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Disclosure of Your Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to comply with legal obligations or to protect the rights, property, or safety of others.</li>
            <li>Business Transfers: In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Security of Your Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>The right to access – You have the right to request copies of your personal data.</li>
            <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>By email: democraticdeveloper@gmail.com</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
