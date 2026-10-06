'use client'

import { useState } from 'react'

interface SuccessPageProps {
  passCode: string
  registrationId?: string
  onScanAnother: () => void
}

export default function SuccessPage({
  passCode,
  onScanAnother,
}: SuccessPageProps) {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      setSubmitted(true)

      setTimeout(() => {
        onScanAnother()
      }, 3000)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center space-y-4 p-6">
          <div className="text-6xl animate-bounce">✅</div>
          <h2 className="text-3xl font-bold text-green-600">
            Merci!
          </h2>
          <p className="text-gray-600">
            Vos données sont enregistrées avec succès.
          </p>
          <p className="text-sm text-gray-500">
            Redirection en cours...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl">✨</div>
          <h1 className="text-3xl font-bold text-gray-800">
            Félicitations!
          </h1>
          <p className="text-gray-600">
            Vous êtes enregistré pour la journée porte ouverte
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-center text-sm font-semibold text-gray-700">
            📌 Votre PASS d'accès:
          </p>
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-900 font-mono break-all">
              {passCode}
            </p>
          </div>
          <p className="text-center text-xs text-gray-500">
            💡 Conseil: Prenez une photo du code ou mémorisez-le
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              📝 Votre nom (optionnel):
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Jean Dupont"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              ℹ️ Vos données sont sécurisées et protégées
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105"
          >
            {isLoading ? '⏳ Traitement...' : '✅ Valider'}
          </button>
        </form>

        <button
          onClick={onScanAnother}
          disabled={isLoading}
          className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:text-gray-400 disabled:border-gray-400 font-semibold py-2 rounded-lg transition"
        >
          🔄 Scanner un autre QR code
        </button>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-2">
          <p className="text-xs font-semibold text-blue-900">
            ℹ️ INFORMATIONS IMPORTANTES
          </p>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>✓ Conservez votre code de passe</li>
            <li>✓ Aucun email de confirmation ne sera envoyé</li>
            <li>✓ Vous pouvez partager votre expérience</li>
            <li>✓ Bienvenue à notre communauté!</li>
          </ul>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>
            🙏 Merci de votre participation à la{' '}
            <span className="font-semibold">
              Journée Porte Ouverte CCB
            </span>
          </p>
          <p className="mt-1">
            <a
              href="mailto:contact@ccbolu.org"
              className="text-blue-600 hover:underline"
            >
              Questions? Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
