import RankingChart from '../../components/RankingChart'

export default function RankingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-cyan-500">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Ranking do Curso AWS</h1>
        <RankingChart />
      </div>
    </main>
  )
}
