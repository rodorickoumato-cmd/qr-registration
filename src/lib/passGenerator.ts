export class PassGenerator {
  private static readonly VERBS = [
    'BRILLE', 'GRACE', 'PAIX', 'JOIE', 'LUMIERE', 'BENIT', 'LOUE',
    'CHOISI', 'APPEL', 'VOCATION', 'BLESSED', 'CONFIE', 'AIME',
    'HOPE', 'FAITH', 'RISE', 'SOAR', 'CROWN', 'SHINES', 'SHALOM',
    'GLORIA', 'VICTOIRE', 'PROMISE', 'TRIUMPH', 'VEILLE', 'PRIE',
    'CHANTE', 'DANSE', 'PORTE', 'GUIDE', 'REVE', 'ESPOIR', 'FORCE',
    'COEUR', 'AMEN', 'ELANCE', 'FLAMME', 'NOEL', 'BETHEL'
  ]

  private static readonly EMOJIS = [
    '⭐', '✨', '🙏', '💎', '👑', '🕊️', '🌟', '⚡', '🎯', '🔥',
    '💫', '🌈', '❤️', '💚', '💛', '🙌', '✝️', '📖', '🕯️', '🎁',
    '🌺', '🌸', '🌼', '🌻', '🌷', '🦋', '🕊', '🌙', '☀️', '⛪'
  ]

  public static generatePass(): string {
    const verb = this.getRandomElement(this.VERBS)
    const number = this.generateRandomNumber(1000, 9999)
    const emoji = this.getRandomElement(this.EMOJIS)

    return `${verb}-${number}${emoji}`
  }

  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]
  }

  private static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

export default PassGenerator
