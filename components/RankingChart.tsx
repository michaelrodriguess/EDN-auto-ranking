'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Tipo para os dados do ranking
type RankingData = {
  name: string
  score: number
}

// Dados de exemplo (você deve substituir isso pelos dados reais)
const data: RankingData[] = [
  { name: 'Aluno A', score: 100 },
  { name: 'Aluno B', score: 95 },
  { name: 'Aluno C', score: 90 },
  { name: 'Aluno D', score: 85 },
  { name: 'Aluno E', score: 80 },
]

export default function RankingChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}