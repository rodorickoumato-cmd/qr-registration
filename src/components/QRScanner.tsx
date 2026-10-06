'use client'

import { useState, useRef, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void
  onScanError?: (error: string) => void
}

export default function QRScanner({ onScanSuccess, onScanError }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    if (!isScanning) return

    setError(null)

    try {
      const scanner = new Html5QrcodeScanner(
        'qr-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        true
      )

      scannerRef.current = scanner

      scanner.render(
        (decodedText) => {
          setIsScanning(false)
          onScanSuccess(decodedText)
        },
        () => {}
      )

      return () => {
        if (scannerRef.current === scanner) {
          scannerRef.current = null
        }
        void scanner.clear().catch((clearError: unknown) => {
          onScanError?.(String(clearError))
        })
      }
    } catch (scanError) {
      const message = String(scanError)
      setError(message)
      onScanError?.(message)
    }
  }, [isScanning, onScanSuccess, onScanError])

  const toggleScanning = () => {
    setIsScanning(!isScanning)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div id="qr-reader" style={{ width: '100%' }}></div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={toggleScanning}
        className="mt-4 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      >
        {isScanning ? '⏹️ Arrêter le scan' : '▶️ Relancer le scan'}
      </button>

      <p className="mt-4 text-center text-gray-600 text-sm">
        📱 Pointez le QR code vers votre caméra
      </p>
    </div>
  )
}
