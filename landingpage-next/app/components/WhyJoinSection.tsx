'use client';

import InfoCard from './reusable/InfoCard';
import ImportedCard from './reusable/ImportedCard';
import { Code, Users, Globe, LifeBuoy } from 'lucide-react';

export default function WhyJoinSection() {
  const benefits = [
    { icon: <Users />, title: 'Mentorship & Guidance', desc: 'Learn from top professionals with personalized career guidance.' },
    { icon: <Code />, title: 'Real-Time Project Learning', desc: 'Gain hands-on experience by working on real projects.' },
    { icon: <Globe />, title: 'Pan-India & Multilingual', desc: 'Accessible online across India in multiple languages.' },
    { icon: <LifeBuoy />, title: 'Career Support', desc: 'Get personalized guidance and support to grow your career.' },
  ];

  return (
    <section className="py-0">
      <div className="max-w-none relative">
        <InfoCard
          padding="p-16 md:p-20"
          bgColor="bg-gradient-to-r from-purple-50 to-blue-50"
          roundedType="bottom"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Why Join BootcampIndia?
              </h2>
            </div>

            {/* Responsive Grid for ImportedCards */}
            <div className="grid gap-6 justify-items-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
              {benefits.map((item, idx) => (
                <ImportedCard
                  key={idx}
                  icon={item.icon}
                  title={item.title}
                  description={item.desc}
                  showButton={false}
                  compact={true}
                />
              ))}
            </div>
          </div>
        </InfoCard>
      </div>
    </section>
  );
}
