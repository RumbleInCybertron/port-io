"use client"

import React from 'react';

export default function Pricing() {
  const pricingPlans = [
    {
      title: 'Basic',
      price: '$9.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      title: 'Pro',
      price: '$19.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    },
    {
      title: 'Premium',
      price: '$29.99',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          Choose a Pricing Plan
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition duration-300"
            >
              <div className="text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{plan.title}</h3>
                <div className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                  {plan.price}
                </div>
                <p className="mt-4 text-sm leading-5 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
                  laudantium, veniam.
                </p>
              </div>
              <div className="mt-8">
                <ul>
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="mt-3 flex items-center justify-start text-sm leading-5 text-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 mr-2 h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  className="block w-full rounded-md py-2 px-4 border border-transparent text-base leading-6 font-medium text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:bg-green-500 transition duration-150 ease-in-out"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
