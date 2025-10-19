'use client';

import InfoCard from './reusable/InfoCard';

interface PricingSectionProps {
  onSelectPlan?: (plan: string) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      name: 'Single Track',
      price: '₹499',
      features: ['4-week access', 'Live sessions', 'Project support', 'Certificate'],
      style: 'bg-white',
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700'
    },
    {
      name: 'Combo (3 Tracks)',
      price: '₹1,499',
      features: ['Choose any 3 tracks', '12-week access', 'Priority support', '3 Certificates'],
      style: 'bg-gradient-to-br from-purple-600 to-blue-600 text-white',
      buttonStyle: 'bg-white text-purple-600 hover:bg-gray-100'
    },
    {
      name: 'Rural Special',
      price: '₹299',
      features: ['For rural students', '1 track access', 'Regional language', 'Certificate'],
      style: 'bg-white',
      buttonStyle: 'bg-purple-600 text-white hover:bg-purple-700'
    }
  ];

  return (
    <section id="pricing" className="py-16 relative">
      {/* Slightly visible rectangular background */}
      <div className="absolute inset-x-0 top-[-100px] -bottom-3 sm:-bottom-3 md:-bottom-5 bg-white/10 z-0"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8 z-10 flex flex-col">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">Simple, Transparent Pricing</h2>
          <p className="mt-2 text-white/80 text-lg">
            Choose the plan that best fits your learning goals.
          </p>
        </div>

        {/* Wrap pricing cards inside an InfoCard */}
        <InfoCard padding="p-12" center>
          <div className="grid md:grid-cols-3 gap-8 mt-8 w-full">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`${plan.style} rounded-2xl shadow-xl p-8 hover:scale-105 transition-transform`}
              >
                {plan.name === 'Combo (3 Tracks)' && (
                  <div className="bg-yellow-400 text-black text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}

                <h3 className={`text-2xl font-bold mb-4 ${plan.style.includes('text-white') ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold mb-6 ${plan.style.includes('text-white') ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </div>
                <ul className={`space-y-3 mb-8 ${plan.style.includes('text-white') ? 'text-white/90' : 'text-gray-600'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-bold transition ${plan.buttonStyle}`}
                  onClick={() => onSelectPlan?.(plan.name)}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </section>
  );
}
