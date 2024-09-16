'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RankingForm() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [topN, setTopN] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('topN', topN)
    formData.append('file', file)

    // Implementar lógica para processar o CSV
    // Por enquanto, está apenas simulando um redirecionamento
    router.push('/ranking')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título da Turma</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">Subtítulo</label>
        <input
          type="text"
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="topN" className="block text-sm font-medium text-gray-700">Quantidade para o Ranking</label>
        <input
          type="number"
          id="topN"
          value={topN}
          onChange={(e) => setTopN(e.target.value)}
          required
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">Arquivo CSV</label>
        <input
          type="file"
          id="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Gerar Ranking
      </button>
    </form>
  )
}