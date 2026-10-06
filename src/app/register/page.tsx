'use client'

import { useEffect, useState } from 'react'
import SuccessPage from '@/components/SuccessPage'

export default function RegisterPage() {
  const [passCode, setPassCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const generatePass = async () => {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })

        const data = await response.json()

        if (data.success) {
          setPassCode(data.passCode)
        } else {
          setError(data.message || 'Erreur lors de la génération du pass')
        }
      } catch (err) {
        console.error('Erreur:', err)
        setError('Erreur de connexion')
      } finally {
        setLoading(false)
      }
    }

    generatePass()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="space-y-4 text-center">
          <div className="animate-spin text-6xl">⏳</div>
          <p className="text-xl text-gray-600">Génération de votre pass...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="space-y-4 text-center">
          <div className="text-6xl">❌</div>
          <p className="text-xl text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-6 py-2 text-white"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  if (passCode) {
    return (
      <SuccessPage
        passCode={passCode}
        onScanAnother={() => window.location.reload()}
      />
    )
  }

  return null
}
