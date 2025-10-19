'use client'

import InfoCard from './reusable/InfoCard'

const batches = [
  {
    name: 'Batch A1',
    language: 'English + Tamil',
    date: 'Jan 15, 2025',
    time: '7:00 PM - 9:00 PM',
    status: 'Open',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Batch B1',
    language: 'English + Hindi',
    date: 'Jan 20, 2025',
    time: '8:00 PM - 10:00 PM',
    status: 'Open',
    statusColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Batch C1',
    language: 'English + Telugu',
    date: 'Jan 25, 2025',
    time: '6:00 PM - 8:00 PM',
    status: 'Filling Fast',
    statusColor: 'bg-yellow-100 text-yellow-800',
  },
]

export default function ScheduleSection() {
  return (
    <div className="w-full px-0 md:px-0">
      <InfoCard
        bgColor="bg-white"
        roundedType="bottom"
        padding="py-24 px-6 md:px-12"
        center={false}
        slightlyVisible={false}
        className="w-full shadow-lg"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-violet-600">Upcoming Batches</h2>
          <p className="text-gray-700 text-lg">
            Pick your batch and start your learning journey with us!
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-t-xl">
          <table className="w-full text-black border-collapse">
            <thead>
              <tr className="bg-violet-600 text-white rounded-t-xl">
                <th className="p-4 text-left">Batch</th>
                <th className="p-4 text-left">Language</th>
                <th className="p-4 text-left">Start Date</th>
                <th className="p-4 text-left">Time</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch, idx) => (
                <tr
                  key={idx}
                  className="border-b border-black/10 hover:bg-black/5 transition-colors"
                >
                  <td className="p-4">{batch.name}</td>
                  <td className="p-4">{batch.language}</td>
                  <td className="p-4">{batch.date}</td>
                  <td className="p-4">{batch.time}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${batch.statusColor}`}
                    >
                      {batch.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfoCard>
    </div>
  )
}
