import React from 'react';

export default function TermofService() {
  return (
    <main className="flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <div className="w-full max-w-2xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to ClickIn2Clicks, a copy-paste extension designed to enhance your productivity by managing your clipboard
            history. By using our extension, you agree to these terms of service.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">User Responsibilities</h2>
          <p className="text-gray-600 dark:text-gray-400">
            As a user, you are responsible for all activities that occur through your use of the ClickIn2Clicks extension.
            You should ensure the security of your data and report any unauthorized access or security breaches immediately.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Content Policy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our extension allows you to manage and store copied content. You retain all rights to the content you copy
            and are solely responsible for its use. Ensure that your copied content complies with applicable laws and does
            not infringe on any intellectual property rights.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Privacy Policy</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We respect your privacy. Our Privacy Policy explains how we collect, use, disclose, and protect your information
            when you use the ClickIn2Clicks extension. We will not share your information with third parties except as described
            in our Privacy Policy.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-400">
            All intellectual property rights in the ClickIn2Clicks extension and its content are owned by us or our licensors.
            These works are protected by copyright laws and treaties around the world. All rights are reserved.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Termination</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We may terminate or suspend your access to ClickIn2Clicks immediately, without prior notice or liability, for any reason,
            including but not limited to a breach of these Terms.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">Governing Law</h2>
          <p className="text-gray-600 dark:text-gray-400">
            These Terms shall be governed and construed in accordance with the laws applicable to our company, without regard
            to its conflict of law provisions.
          </p>
        </section>
      </div>
    </main>
  );
}
