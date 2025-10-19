'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronUp } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    { question: 'What is the duration of each track?', answer: 'Each track runs for 4-6 weeks with live sessions twice a week.' },
    { question: 'Are the classes recorded?', answer: 'Yes, all sessions are recorded and shared with enrolled students.' },
    { question: 'What languages are supported?', answer: 'We support English, Hindi, Tamil, and Telugu in our courses.' },
    { question: 'Is certification provided?', answer: 'Yes, you will receive a certificate upon successful completion of the track(s).' },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-white text-left">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/20 pb-4">
              <Disclosure>
                {({ open }) => (
                  <div className="cursor-pointer transition-transform hover:translate-y-[-2px]">
                    <Disclosure.Button className="flex justify-between w-full text-left text-white font-semibold text-xl transition-colors hover:text-purple-300">
                      <span>{faq.question}</span>
                      <ChevronUp className={`${open ? 'rotate-180 transform' : ''} w-5 h-5`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2 text-white/80 text-lg leading-relaxed">
                      {faq.answer}
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
