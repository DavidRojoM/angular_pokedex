export function getType(type: string): string {
  let result = ''
  switch (type) {
    case 'water':
      result = 'bg-primary'
      break
    case 'bug':
      result = 'bg-success'
      break
    case 'fire':
      result = 'bg-reddish'
      break
    case 'grass':
      result = 'bg-success'
      break
    case 'poison':
      result = 'bg-purple'
      break
    case 'flying':
      result = 'bg-info text-dark'
      break
    case 'normal':
      result = 'bg-warning text-dark'
      break
    case 'electric':
      result = 'bg-yellow text-dark'
      break
    case 'ground':
      result = 'bg-brown'
      break
    case 'psychic':
      result = 'bg-pink'
      break
    case 'fighting':
      result = 'bg-warning text-dark'
      break
    case 'fairy':
      result = 'bg-pink'
      break
    case 'steel':
      result = 'bg-light text-dark'
      break
    case 'rock':
      result = 'bg-secondary'
      break
    case 'ghost':
      result = 'bg-light text-dark'
      break
    case 'dragon':
      result = 'bg-warning text-dark'
      break
    case 'ice':
      result = 'bg-info text-dark'
      break
    case 'dark':
      result = 'bg-dark'
  }
  return result
}
