import { PassGenerator } from '@/lib/passGenerator'

export async function POST(request: Request) {
  try {
    await request.json()

    const passCode = PassGenerator.generatePass()

    return Response.json(
      {
        success: true,
        passCode,
        message: 'Félicitations! Vous êtes enregistré!',
        registrationId: Math.random().toString(36).substr(2, 9),
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erreur serveur:', error)
    return Response.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
