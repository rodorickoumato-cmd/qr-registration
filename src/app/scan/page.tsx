'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import SuccessPage from '@/components/SuccessPage'

const QRScanner = dynamic(() => import('@/components/QRScanner'), {
  ssr: false,
})

export default function ScanPage() {
  const [passCode, setPassCode] = useState<string | null>(null)

  const handleScanSuccess = async (decodedText: string) => {
    console.log('QR Code scanned:', decodedText)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCode: decodedText }),
      })

      const data = await response.json()

      if (data.success) {
        setPassCode(data.passCode)
      } else {
        alert('Erreur: ' + data.message)
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error)
      alert('Erreur de connexion')
    }
  }

  if (passCode) {
    return (
      <SuccessPage
        passCode={passCode}
        onScanAnother={() => setPassCode(null)}
      />
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Scannez le QR Code
        </h1>
        <QRScanner onScanSuccess={handleScanSuccess} />
      </div>
    </div>
  )
}
