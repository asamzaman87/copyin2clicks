'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const PremiumCheckout = ({handleSubscription}) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handlePlanChange = (plan: React.SetStateAction<string>) => {
    setSelectedPlan(plan);
  };




  return (
    <div className="max-w-5xl mx-auto p-10 border shadow-lg rounded-md">
        <form className="space-y-6" onSubmit={handleSubscription}>
          <div className="border-b border-gray-300 pb-4 flex gap-5">
            <h2 className="text-2xl font-bold mb-2">Choose your subscription</h2>
            {/* <select className="border text-sm rounded-md outline-none">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
              <option value="NZD">NZD</option>
              <option value="CHF">CHF</option>
              <option value="PLN">PLN</option>
              <option value="JPY">JPY</option>
              <option value="RUB">RUB</option>
            </select> */}
          </div>
          <div className="grid grid-cols-2 gap-16 py-10">
            <div>
              {/* <button
                type="button"
                className={`w-full py-2 px-4 border ${selectedPlan === 'yearly' ? 'border-blue-500' : 'border-gray-300'} rounded-lg`}
                onClick={() => handlePlanChange('yearly')}
              >
                <span className="block">
                  <span className="text-lg font-bold">$40</span> / yearly
                </span>
                {selectedPlan === 'yearly' && (
                  <span className="block text-green-500">
                    Save <span className="font-bold">17</span>%
                  </span>
                )}
              </button> */}
              <button
                type="button"
                className={`w-full py-2 px-4 border ${selectedPlan === 'monthly' ? 'bg-blue-500 text-white' : 'border-gray-300'} rounded-lg`}
                onClick={() => handlePlanChange('monthly')}
              >
                <span className="block">
                  <span className="text-lg font-bold">$1.99</span> / monthly
                </span>
              </button>
            </div>
            <div className="flex flex-col justify-between">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white rounded-lg flex items-center justify-center"
              >
                <Image alt="not-found" src="/button-lock.svg" height={24} width={24} className="mr-2" />
                Checkout Now
              </button>
              <Image
                alt="not-found"
                src="/payment-providers.svg"
                height={32}
                width={358}
                className="mt-2"
              />
            </div>
          </div>
          {/* <div className="grid grid-cols-2 gap-10 border-t border-gray-300 pt-4"> */}
            {/* <div>
              <p>
                Already have premium or contributed before?&nbsp;
                <Link href="#" className="text-blue-500">Activate here</Link>
              </p>
            </div> */}
            <div className="flex justify-end border-t border-gray-300 pt-4">
              <Image className="mr-2" src="/checked-shield.svg" height={24} width={22} alt="not-found" />
              7-Day money-back guarantee
            </div>
          {/* </div> */}
        </form>
    </div>
  );
};

export default PremiumCheckout;
